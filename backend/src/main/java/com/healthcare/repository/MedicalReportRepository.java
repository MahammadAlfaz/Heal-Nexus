package com.healthcare.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.model.MedicalReport;
import com.healthcare.model.User;

@Repository
public interface MedicalReportRepository extends MongoRepository<MedicalReport, String> {
    List<MedicalReport> findByPatient(User patient);
    List<MedicalReport> findByDoctor(User doctor);
    List<MedicalReport> findByPatientAndStatus(User patient, String status);
}
