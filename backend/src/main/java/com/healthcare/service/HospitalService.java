package com.healthcare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.model.Hospital;
import com.healthcare.repository.HospitalRepository;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(String id) {
        return hospitalRepository.findById(id);
    }

    public List<Hospital> getHospitalsByCity(String city) {
        return hospitalRepository.findByCity(city);
    }

    public List<Hospital> getHospitalsByState(String state) {
        return hospitalRepository.findByState(state);
    }

    public List<Hospital> getHospitalsByInsurance(String insuranceProvider) {
        return hospitalRepository.findByAcceptedInsurancesContaining(insuranceProvider);
    }

    public Hospital saveHospital(Hospital hospital) {
        hospital.setUpdatedAt(java.time.LocalDateTime.now());
        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(String id) {
        hospitalRepository.deleteById(id);
    }

    public List<Hospital> searchHospitals(String query) {
        // Simple search implementation - can be enhanced with more complex queries
        return hospitalRepository.findAll().stream()
            .filter(hospital ->
                hospital.getName().toLowerCase().contains(query.toLowerCase()) ||
                hospital.getCity().toLowerCase().contains(query.toLowerCase()) ||
                hospital.getState().toLowerCase().contains(query.toLowerCase()) ||
                (hospital.getServices() != null && java.util.Arrays.stream(hospital.getServices())
                    .anyMatch(service -> service.toLowerCase().contains(query.toLowerCase()))) ||
                (hospital.getSpecialties() != null && java.util.Arrays.stream(hospital.getSpecialties())
                    .anyMatch(specialty -> specialty.toLowerCase().contains(query.toLowerCase())))
            )
            .toList();
    }
}
