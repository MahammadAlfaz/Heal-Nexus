package com.healthcare.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "medical_reports")
public class MedicalReport {

    @Id
    private String id;

    @DBRef
    private User patient;

    @DBRef
    private User doctor;

    private String reportType;

    private LocalDate reportDate;

    private String status;

    private String fileUrl;

    private LocalDateTime createdAt;

    // Constructors
    public MedicalReport() {}

    public MedicalReport(User patient, User doctor, String reportType, LocalDate reportDate, String status, String fileUrl) {
        this.patient = patient;
        this.doctor = doctor;
        this.reportType = reportType;
        this.reportDate = reportDate;
        this.status = status;
        this.fileUrl = fileUrl;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public User getPatient() { return patient; }
    public void setPatient(User patient) { this.patient = patient; }

    public User getDoctor() { return doctor; }
    public void setDoctor(User doctor) { this.doctor = doctor; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public LocalDate getReportDate() { return reportDate; }
    public void setReportDate(LocalDate reportDate) { this.reportDate = reportDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
