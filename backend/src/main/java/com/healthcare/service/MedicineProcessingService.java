package com.healthcare.service; // Corrected package

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcare.model.Medicine;
import com.healthcare.model.PendingMedicine;
import com.healthcare.model.VerificationStatus;
import com.healthcare.repository.MedicineRepository;
import com.healthcare.repository.PendingMedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MedicineProcessingService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PendingMedicineRepository pendingMedicineRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public Object processScannedMedicine(PendingMedicine scannedData) throws Exception {
        // 1. Check if a verified medicine already exists in the main database
        Optional<Medicine> existingVerifiedMedicine = medicineRepository
                .findByBrandNameAndManufacturer(scannedData.getBrandName(), scannedData.getManufacturer());

        if (existingVerifiedMedicine.isPresent()) {
            // A verified version exists, return it directly. No admin action needed.
            return existingVerifiedMedicine.get();
        }

        // 2. No verified medicine found. Check if an identical one is already pending verification.
        Optional<PendingMedicine> existingPendingMedicine = pendingMedicineRepository
                .findByBrandNameAndManufacturerAndStatus(scannedData.getBrandName(), scannedData.getManufacturer(), VerificationStatus.PENDING);

        if (existingPendingMedicine.isPresent()) {
            // Already in the queue, return the pending data to avoid duplicates.
            return existingPendingMedicine.get();
        }

        // 3. This is a new, unverified medicine. Add it to the pending queue.
        PendingMedicine newPendingMedicine = new PendingMedicine();
        newPendingMedicine.setBrandName(scannedData.getBrandName());
        newPendingMedicine.setGeneric(scannedData.getGeneric());
        newPendingMedicine.setManufacturer(scannedData.getManufacturer());
        newPendingMedicine.setCategory(scannedData.getCategory());
        newPendingMedicine.setCritical(scannedData.isCritical());
        
        // The data from AI is already a string, so we just set it.
        newPendingMedicine.setDosage(scannedData.getDosage());
        newPendingMedicine.setUses(scannedData.getUses());
        newPendingMedicine.setSideEffects(scannedData.getSideEffects());
        newPendingMedicine.setWarnings(scannedData.getWarnings());
        newPendingMedicine.setFoodInstructions(scannedData.getFoodInstructions());

        newPendingMedicine.setStatus(VerificationStatus.PENDING);
        newPendingMedicine.setScannedAt(LocalDateTime.now());

        PendingMedicine savedPendingMedicine = pendingMedicineRepository.save(newPendingMedicine);
        return savedPendingMedicine;
    }
}