package com.healthcare.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "pending_medicines")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PendingMedicine {

    @Id
    private String id;

    private String brandName;

    private String generic;

    private String manufacturer;

    private String category;

    private String dosage; // Storing as JSON string

    private String uses; // Storing as JSON string

    private String sideEffects; // Storing as JSON string

    private String warnings; // Storing as JSON string

    private String foodInstructions;

    private boolean isCritical;

    private VerificationStatus status;

    private LocalDateTime scannedAt;

}
