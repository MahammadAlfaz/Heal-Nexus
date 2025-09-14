package com.healthcare.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.MedicalReport;
import com.healthcare.model.User;
import com.healthcare.service.MedicalReportService;
import com.healthcare.service.UserService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicalReportController {

    @Autowired
    private MedicalReportService medicalReportService;

    @Autowired
    private UserService userService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalReport>> getReportsByPatient(@PathVariable String patientId) {
        User patient = userService.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));
        List<MedicalReport> reports = medicalReportService.getReportsByPatient(patient);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalReport>> getReportsByDoctor(@PathVariable String doctorId) {
        User doctor = userService.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found"));
        List<MedicalReport> reports = medicalReportService.getReportsByDoctor(doctor);
        return ResponseEntity.ok(reports);
    }

    @PostMapping
    public ResponseEntity<MedicalReport> createReport(@RequestBody CreateReportRequest request) {
        User patient = userService.findById(request.getPatientId()).orElseThrow(() -> new RuntimeException("Patient not found"));
        User doctor = userService.findById(request.getDoctorId()).orElse(null);
        MedicalReport report = medicalReportService.createReport(patient, doctor, request.getReportType(), LocalDate.parse(request.getReportDate()), request.getStatus(), request.getFileUrl());
        return ResponseEntity.ok(report);
    }

    @PutMapping("/{reportId}/status")
    public ResponseEntity<MedicalReport> updateReportStatus(@PathVariable String reportId, @RequestBody UpdateStatusRequest request) {
        MedicalReport report = medicalReportService.updateReportStatus(reportId, request.getStatus());
        return ResponseEntity.ok(report);
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
