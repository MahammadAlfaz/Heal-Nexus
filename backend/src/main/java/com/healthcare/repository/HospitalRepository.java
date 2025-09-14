package com.healthcare.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.model.Hospital;

@Repository
public interface HospitalRepository extends MongoRepository<Hospital, String> {
    List<Hospital> findByCity(String city);
    List<Hospital> findByState(String state);
    List<Hospital> findByAcceptedInsurancesContaining(String insuranceProvider);
}
