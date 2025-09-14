package com.healthcare.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.healthcare.model.MedicineScan;
import com.healthcare.repository.MedicineScanRepository;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import reactor.core.publisher.Mono;

@Service
public class MedicineScanService {

    private final MedicineScanRepository medicineScanRepository;
    private final AiService aiService;

    @Value("${medicine.scan.image.storage.path:uploads/medicine_images}")
    private String imageStoragePath;

    public MedicineScanService(MedicineScanRepository medicineScanRepository, AiService aiService) {
        this.medicineScanRepository = medicineScanRepository;
        this.aiService = aiService;
    }

    public MedicineScan processMedicineScan(MultipartFile file) throws IOException, TesseractException {
        // Save image to file system
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path storageDir = Paths.get(System.getProperty("user.dir"), imageStoragePath);
        if (!Files.exists(storageDir)) {
            Files.createDirectories(storageDir);
        }
        Path filePath = storageDir.resolve(fileName);
        Files.write(filePath, file.getBytes());

        // Perform OCR using Tesseract
        ITesseract tesseract = new Tesseract();
        // Set tessdata path - Tesseract will look for language data files here
        // Note: tessdata files need to be downloaded separately and placed in this directory
        String tessdataPath = System.getProperty("user.dir") + "\\backend\\tessdata";
        System.setProperty("TESSDATA_PREFIX", tessdataPath);
        tesseract.setDatapath(tessdataPath);
        tesseract.setLanguage("eng"); // English language
        String extractedText = tesseract.doOCR(filePath.toFile());

        // Use Gemini AI to parse extracted text into structured data
        String prompt = "Parse the following medicine information extracted from an image into a structured JSON format. " +
                       "Return ONLY valid JSON with these fields: brandName, generic, category, uses (array), dosage, " +
                       "foodInstructions, sideEffects (object with common and serious arrays), warnings (array), isCritical (boolean). " +
                       "If information is not available, use reasonable defaults or empty arrays. " +
                       "Extracted text:\n" + extractedText;

        try {
            Mono<String> structuredDataMono = aiService.queryAI(prompt, "English");
            String structuredData = structuredDataMono.block(); // Blocking for simplicity

            // Clean up the response - remove markdown formatting if present
            if (structuredData != null) {
                structuredData = structuredData.replaceAll("```json\\s*", "").replaceAll("\\s*```", "").trim();
            }

            // Save MedicineScan entity
            MedicineScan medicineScan = new MedicineScan(filePath.toString(), extractedText, structuredData);
            return medicineScanRepository.save(medicineScan);
        } catch (Exception e) {
            // If AI fails, save with extracted text only
            String fallbackData = "{\"error\": \"Failed to parse medicine data\", \"extractedText\": \"" + extractedText.replace("\"", "\\\"") + "\"}";
            MedicineScan medicineScan = new MedicineScan(filePath.toString(), extractedText, fallbackData);
            return medicineScanRepository.save(medicineScan);
        }
    }
}
