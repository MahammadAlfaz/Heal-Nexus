package com.healthcare.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.Hospital;
import com.healthcare.service.HospitalService;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"})
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable String id) {
        Optional<Hospital> hospital = hospitalService.getHospitalById(id);
        return hospital.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Hospital>> searchHospitals(@RequestParam String query) {
        List<Hospital> hospitals = hospitalService.searchHospitals(query);
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Hospital>> getHospitalsByCity(@PathVariable String city) {
        List<Hospital> hospitals = hospitalService.getHospitalsByCity(city);
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<Hospital>> getHospitalsByState(@PathVariable String state) {
        List<Hospital> hospitals = hospitalService.getHospitalsByState(state);
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/insurance/{insuranceProvider}")
    public ResponseEntity<List<Hospital>> getHospitalsByInsurance(@PathVariable String insuranceProvider) {
        List<Hospital> hospitals = hospitalService.getHospitalsByInsurance(insuranceProvider);
        return ResponseEntity.ok(hospitals);
    }

    @PostMapping
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital savedHospital = hospitalService.saveHospital(hospital);
        return ResponseEntity.ok(savedHospital);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable String id, @RequestBody Hospital hospital) {
        Optional<Hospital> existingHospital = hospitalService.getHospitalById(id);
        if (existingHospital.isPresent()) {
            hospital.setId(id);
            Hospital updatedHospital = hospitalService.saveHospital(hospital);
            return ResponseEntity.ok(updatedHospital);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable String id) {
        Optional<Hospital> hospital = hospitalService.getHospitalById(id);
        if (hospital.isPresent()) {
            hospitalService.deleteHospital(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
