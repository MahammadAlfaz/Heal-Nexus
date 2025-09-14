package com.healthcare.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.model.MedicineScan;

@Repository
public interface MedicineScanRepository extends MongoRepository<MedicineScan, String> {
}
