package com.healthcare.dto;

public class MedicalReportDTO {
    private String id;
    private String patientName;
    private String doctorName;
    private String type;
    private String date;
    private String status;
    private String fileUrl;
    private String extractedData;

    public MedicalReportDTO() {}

    public MedicalReportDTO(com.healthcare.model.MedicalReport report) {
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
