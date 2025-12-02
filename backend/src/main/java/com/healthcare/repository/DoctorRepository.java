package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.model.Doctor;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    List<Doctor> findBySpecialization(String specialization);
    List<Doctor> findByHospitalAffiliation(String hospitalAffiliation);
    Optional<Doctor> findByEmail(String email);
}
