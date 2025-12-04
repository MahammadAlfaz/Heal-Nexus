package com.healthcare.repository;

import com.healthcare.model.PendingMedicine;
import com.healthcare.model.VerificationStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PendingMedicineRepository extends MongoRepository<PendingMedicine, String> {
    List<PendingMedicine> findByStatus(VerificationStatus status);
    Optional<PendingMedicine> findByBrandNameAndManufacturerAndStatus(String brandName, String manufacturer, VerificationStatus status);
}
