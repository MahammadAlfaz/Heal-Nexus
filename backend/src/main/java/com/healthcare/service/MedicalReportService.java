package com.healthcare.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.model.MedicalReport;
import com.healthcare.model.User;
import com.healthcare.repository.MedicalReportRepository;

@Service
public class MedicalReportService {

    @Autowired
    private MedicalReportRepository medicalReportRepository;

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
}
