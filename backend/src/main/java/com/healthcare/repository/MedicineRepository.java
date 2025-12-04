package com.healthcare.repository;

import com.healthcare.model.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    Optional<Medicine> findByBrandNameAndManufacturer(String brandName, String manufacturer);
}

