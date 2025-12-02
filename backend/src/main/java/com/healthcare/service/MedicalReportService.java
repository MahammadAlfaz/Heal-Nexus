package com.healthcare.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthcare.model.MedicalReport;
import com.healthcare.model.User;
import com.healthcare.repository.MedicalReportRepository;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import reactor.core.publisher.Mono;

@Service
public class MedicalReportService {

    private final MedicalReportRepository medicalReportRepository;
    private final AiService aiService;

    public MedicalReportService(MedicalReportRepository medicalReportRepository, AiService aiService) {
        this.medicalReportRepository = medicalReportRepository;
        this.aiService = aiService;
    }

    public MedicalReport createReport(User patient, User doctor, String reportType, LocalDate reportDate, String status, String fileUrl) {
        MedicalReport report = new MedicalReport(patient, doctor, reportType, reportDate, status, fileUrl);
        return medicalReportRepository.save(report);
    }

    public List<MedicalReport> getReportsByPatient(User patient) {
        return medicalReportRepository.findByPatient(patient);
    }

    public List<MedicalReport> getReportsByDoctor(User doctor) {
        return medicalReportRepository.findByDoctor(doctor);
    }

    public List<MedicalReport> getPendingReportsByPatient(User patient) {
        return medicalReportRepository.findByPatientAndStatus(patient, "Pending Review");
    }

    public MedicalReport updateReportStatus(String reportId, String status) {
        MedicalReport report = medicalReportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Report not found"));
        report.setStatus(status);
        return medicalReportRepository.save(report);
    }

    // New method to upload and extract report data
    public Mono<MedicalReport> uploadAndExtractReport(MultipartFile file, User patient, String reportType, LocalDate reportDate, String description) {
        return Mono.fromCallable(() -> { // Step 1: Save the file (blocking I/O)
            // Save the uploaded file
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("uploads", "reports");
            Files.createDirectories(uploadPath);
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());
            String fileUrl = "/uploads/reports/" + fileName;
            return fileUrl;
        }).flatMap(fileUrl -> {
            // Step 2: Extract text (blocking I/O and can throw IOException)
            return Mono.fromCallable(() -> extractTextFromFile(file))
                .flatMap(extractedText -> 
                    // Step 3: Analyze with AI (asynchronous)
                    analyzeReportWithAI(extractedText, reportType)
                )
                .map(structuredData -> { // Step 4: Create and save the report
                MedicalReport report = new MedicalReport(patient, null, reportType, reportDate, "Completed", fileUrl);
                report.setExtractedData(structuredData);
                return medicalReportRepository.save(report);
            });
        });
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }

    private String extractTextFromFile(MultipartFile file) throws IOException {
        File convFile = convertMultiPartToFile(file);
        String fileName = file.getOriginalFilename();
        String extractedText;

        try {
            if (fileName != null && (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".jpeg") || fileName.toLowerCase().endsWith(".png") || fileName.toLowerCase().endsWith(".webp"))) {
                ITesseract tesseract = new Tesseract();
                String tessdataPath = System.getProperty("user.dir") + "/../tessdata";
                tesseract.setDatapath(tessdataPath);
                tesseract.setLanguage("eng");
                extractedText = tesseract.doOCR(convFile);
            } else if (fileName != null && fileName.toLowerCase().endsWith(".pdf")) {
                try (PDDocument document = PDDocument.load(convFile)) {
                    if (!document.isEncrypted()) {
                        PDFTextStripper pdfStripper = new PDFTextStripper();
                        extractedText = pdfStripper.getText(document);
                    } else {
                        extractedText = "Error: Encrypted PDF files are not supported.";
                    }
                }
            } else {
                throw new IOException("Unsupported file type: " + fileName);
            }
        } catch (TesseractException e) {
            throw new IOException("Error during OCR text extraction: " + e.getMessage(), e);
        } finally {
            if (convFile.exists()) {
                convFile.delete();
            }
        }

        return extractedText;
    }

    private Mono<String> analyzeReportWithAI(String extractedText, String reportType) {
        // Use AI service to analyze the extracted text and structure it
        String prompt = "Analyze this medical report text and return ONLY a valid JSON object. " +
                "The JSON object should have two keys: 'summary' (a brief summary of the findings) and 'testResults' (an array of objects). " +
                "Each object in 'testResults' should have the following keys: 'testName', 'value', 'unit', 'referenceRange', and 'status' ('normal', 'high', or 'low'). " +
                "If information for a field is not available, use an empty string or an empty array. " +
                "Report type: " + reportType + ". Text: " + extractedText;
        
        return aiService.queryAI(prompt, "english")
            .map(response -> response.replaceAll("```json\\s*", "").replaceAll("\\s*```", "").trim())
            .onErrorReturn("{\"summary\": \"AI analysis failed. See server logs for details.\", \"testResults\": []}");
    }
}
