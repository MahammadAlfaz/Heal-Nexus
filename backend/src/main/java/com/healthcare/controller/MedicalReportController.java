package com.healthcare.controller;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthcare.model.MedicalReport;
import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.service.DoctorService;
import com.healthcare.service.MedicalReportService;
import com.healthcare.service.UserService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicalReportController {

    private static final Logger logger = LoggerFactory.getLogger(MedicalReportController.class);

    private final MedicalReportService medicalReportService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final DoctorService doctorService;

    public MedicalReportController(MedicalReportService medicalReportService, UserService userService, UserRepository userRepository, DoctorService doctorService) {
        this.medicalReportService = medicalReportService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.doctorService = doctorService;
    }

    public static class MedicalReportDTO {
        private String id;
        private String patientName;
        private String doctorName;
        private String type;
        private String date;
        private String status;
        private String fileUrl;
        private String extractedData;

        public MedicalReportDTO() {}

        public MedicalReportDTO(MedicalReport report) {
            this.id = report.getId();
            this.patientName = report.getPatient() != null ? report.getPatient().getFullName() : null;
            this.doctorName = report.getDoctor() != null ? report.getDoctor().getFullName() : null;
            this.type = report.getReportType();
            this.date = report.getReportDate() != null ? report.getReportDate().toString() : null;
            this.status = report.getStatus();
            this.fileUrl = report.getFileUrl();
            this.extractedData = report.getExtractedData();
        }

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getPatientName() { return patientName; }
        public void setPatientName(String patientName) { this.patientName = patientName; }
        public String getDoctorName() { return doctorName; }
        public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getFileUrl() { return fileUrl; }
        public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
        public String getExtractedData() { return extractedData; }
        public void setExtractedData(String extractedData) { this.extractedData = extractedData; }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalReportDTO>> getReportsByPatient(@PathVariable String patientId) {
        Optional<User> patientOpt = userService.findById(patientId);
        if (patientOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User patient = patientOpt.get();
        List<MedicalReport> reports = medicalReportService.getReportsByPatient(patient);
        List<MedicalReportDTO> dtos = reports.stream().map(MedicalReportDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalReportDTO>> getReportsByDoctor(@PathVariable String doctorId) {
        Optional<User> doctorOpt = userService.findById(doctorId);
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        User doctor = doctorOpt.get();
        List<MedicalReport> reports = medicalReportService.getReportsByDoctor(doctor);
        List<MedicalReportDTO> dtos = reports.stream().map(MedicalReportDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<MedicalReport> createReport(@RequestBody CreateReportRequest request) {
        Optional<User> patientOpt = userService.findById(request.getPatientId());
        if (patientOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User patient = patientOpt.get();
        User doctor = userService.findById(request.getDoctorId()).orElse(null);
        MedicalReport report = medicalReportService.createReport(patient, doctor, request.getReportType(), LocalDate.parse(request.getReportDate()), request.getStatus(), request.getFileUrl());
        return ResponseEntity.ok(report);
    }

    @PutMapping("/{reportId}/status")
    public ResponseEntity<MedicalReport> updateReportStatus(@PathVariable String reportId, @RequestBody UpdateStatusRequest request) {
        MedicalReport report = medicalReportService.updateReportStatus(reportId, request.getStatus());
        return ResponseEntity.ok(report);
    }

    // New endpoint for uploading medical report file and extracting test data
    @PostMapping("/upload")
    public Mono<ResponseEntity<MedicalReportDTO>> uploadMedicalReport(
            @RequestParam("file") MultipartFile file,
            @RequestParam("reportType") String reportType,
            @RequestParam("reportDate") String reportDate,
            @RequestParam("description") String description,
            Authentication authentication) {
        
        logger.info("Starting medical report upload process");

        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            logger.error("No authenticated user found in security context");
            return Mono.just(ResponseEntity.status(403).build());
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername().split(":")[0];
        logger.info("Extracted email from JWT token: {}", email);

        return Mono.just(userRepository.findByEmail(email))
            .flatMap(userOptional -> {
                if (userOptional.isEmpty()) {
                    logger.error("User not found in database with email: {}", email);
                    return Mono.just(ResponseEntity.status(403).<MedicalReportDTO>build());
                }
                User patient = userOptional.get();
                logger.info("Successfully found patient: {} with ID: {}", patient.getEmail(), patient.getId());
                return medicalReportService.uploadAndExtractReport(file, patient, reportType, LocalDate.parse(reportDate), description)
                        .map(report -> ResponseEntity.ok(new MedicalReportDTO(report)));
            })
            .onErrorResume(e -> {
                logger.error("Error during medical report upload: {}", e.getMessage(), e);
                return Mono.just(ResponseEntity.status(500).build());
            });
    }

    public static class CreateReportRequest {
        private String patientId;
        private String doctorId;
        private String reportType;
        private String reportDate;
        private String status;
        private String fileUrl;

        // Getters and Setters
        public String getPatientId() { return patientId; }
        public void setPatientId(String patientId) { this.patientId = patientId; }
        public String getDoctorId() { return doctorId; }
        public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
        public String getReportType() { return reportType; }
        public void setReportType(String reportType) { this.reportType = reportType; }
        public String getReportDate() { return reportDate; }
        public void setReportDate(String reportDate) { this.reportDate = reportDate; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getFileUrl() { return fileUrl; }
        public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    }

    public static class UpdateStatusRequest {
        private String status;

        // Getters and Setters
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
