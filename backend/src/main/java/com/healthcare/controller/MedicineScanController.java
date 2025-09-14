package com.healthcare.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthcare.model.MedicineScan;
import com.healthcare.service.MedicineScanService;

import net.sourceforge.tess4j.TesseractException;

@RestController
@RequestMapping("/api/scan")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineScanController {

    private final MedicineScanService medicineScanService;

    public MedicineScanController(MedicineScanService medicineScanService) {
        this.medicineScanService = medicineScanService;
    }

    @PostMapping("/medicine")
    public ResponseEntity<?> scanMedicine(@RequestParam("file") MultipartFile file) {
        try {
            MedicineScan medicineScan = medicineScanService.processMedicineScan(file);
            return ResponseEntity.ok(medicineScan);
        } catch (IOException | TesseractException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to process medicine scan: " + e.getMessage());
        }
    }
}
