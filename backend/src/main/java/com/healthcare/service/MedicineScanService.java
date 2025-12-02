package com.healthcare.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(MedicineScanService.class);

    private final MedicineScanRepository medicineScanRepository;
    private final AiService aiService;

    @Value("${medicine.scan.image.storage.path:uploads/medicine_images}")
    private String imageStoragePath;

    public MedicineScanService(MedicineScanRepository medicineScanRepository, AiService aiService) {
        this.medicineScanRepository = medicineScanRepository;
        this.aiService = aiService;
    }

    public Mono<MedicineScan> processMedicineScan(MultipartFile file) {
        return Mono.fromCallable(() -> {
            // Save image to file system
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path storageDir = Paths.get(System.getProperty("user.dir"), imageStoragePath);
            Files.createDirectories(storageDir);
            Path filePath = storageDir.resolve(fileName);
            Files.write(filePath, file.getBytes());
            return filePath;
        }).flatMap(filePath -> {
            // Perform OCR using Tesseract
            return Mono.fromCallable(() -> {
                ITesseract tesseract = new Tesseract();
                String tessdataPath = System.getProperty("user.dir") + "\\tessdata";
                System.setProperty("TESSDATA_PREFIX", tessdataPath);
                tesseract.setDatapath(tessdataPath);
                tesseract.setLanguage("eng");
                return tesseract.doOCR(filePath.toFile());
            }).flatMap(extractedText -> {
                // Use Gemini AI to parse extracted text
                String prompt = "Parse the following medicine information extracted from an image into a detailed and comprehensive structured JSON format. " +
                               "Return ONLY valid JSON with these fields: brandName, generic, category, uses (array), dosage, " +
                               "foodInstructions, sideEffects (object with common and serious arrays), warnings (array), isCritical (boolean). " +
                               "Provide as much detail as possible in each field. If information is not available, use reasonable defaults or empty arrays. " +
                               "Extracted text:\n" + extractedText;

                return aiService.queryAI(prompt, "English")
                    .map(structuredData -> {
                        String cleanedData = structuredData.replaceAll("```json\\s*", "").replaceAll("\\s*```", "").trim();
                        MedicineScan medicineScan = new MedicineScan(filePath.toString(), extractedText, cleanedData);
                        return medicineScanRepository.save(medicineScan);
                    });
            }).onErrorResume(TesseractException.class, e -> {
                logger.error("Tesseract OCR failed: {}", e.getMessage());
                String fallbackData = "{\"error\": \"OCR failed to extract text from image.\"}";
                MedicineScan medicineScan = new MedicineScan(filePath.toString(), "OCR_FAILED", fallbackData);
                return Mono.just(medicineScanRepository.save(medicineScan));
            });
        }).onErrorResume(IOException.class, e -> {
            logger.error("File I/O error during medicine scan: {}", e.getMessage());
            String fallbackData = "{\"error\": \"Failed to save or process the uploaded image file.\"}";
            MedicineScan medicineScan = new MedicineScan("IO_ERROR", "IO_ERROR", fallbackData);
            // We don't save this one as there's no file path. We just signal the error.
            return Mono.just(medicineScan);
        });
    }
}
