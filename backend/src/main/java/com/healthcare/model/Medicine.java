package com.healthcare.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "medicines")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String brandName;

    private String generic;

    @Column(nullable = false)
    private String manufacturer;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String dosage; // Storing as JSON string

    @Column(columnDefinition = "TEXT")
    private String uses; // Storing as JSON string

    @Column(columnDefinition = "TEXT")
    private String sideEffects; // Storing as JSON string

    @Column(columnDefinition = "TEXT")
    private String warnings; // Storing as JSON string

    private String foodInstructions;

    private boolean isCritical;

    private boolean verified;

    @Column(nullable = false)
    private LocalDateTime createdAt;

}
