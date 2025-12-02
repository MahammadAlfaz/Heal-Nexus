package com.healthcare.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.healthcare.service.MedicineScanService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/scan")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineScanController {

    private static final Logger logger = LoggerFactory.getLogger(MedicineScanController.class);
    private final MedicineScanService medicineScanService;

    public MedicineScanController(MedicineScanService medicineScanService) {
        this.medicineScanService = medicineScanService;
    }

    @PostMapping("/medicine")
    public Mono<ResponseEntity<ObjectNode>> scanMedicine(@RequestParam("file") MultipartFile file) {
        logger.info("Received request for medicine scan for file: {}", file.getOriginalFilename());

        return medicineScanService.processMedicineScan(file)
            .map(medicineScan -> {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    ObjectNode jsonNode = (ObjectNode) objectMapper.readTree(medicineScan.getStructuredData());

                    // If structuredData contains an error, add isUnknown flag
                    if (jsonNode.has("error")) {
                        jsonNode.put("isUnknown", true);
                    }
                    logger.info("Successfully processed medicine scan for file: {}", file.getOriginalFilename());
                    return ResponseEntity.ok(jsonNode);
                } catch (JsonProcessingException e) {
                    logger.error("Failed to parse JSON from AI response: {}", e.getMessage());
                    throw new RuntimeException("Failed to parse AI response.", e);
                }
            })
            .onErrorResume(e -> {
                logger.error("An error occurred during medicine scan processing: {}", e.getMessage(), e);
                return Mono.just(ResponseEntity.status(500).build());
            });
    }
}
