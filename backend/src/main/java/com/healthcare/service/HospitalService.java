package com.healthcare.service;

import java.util.Comparator;
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

    public Optional<Hospital> findNearestHospital(double latitude, double longitude) {
        return hospitalRepository.findAll().stream()
            .filter(h -> "yes".equalsIgnoreCase(h.getEmergencyServices()) && h.getLatitude() != null && h.getLongitude() != null)
            .min(Comparator.comparing(h ->
                distance(latitude, longitude, h.getLatitude(), h.getLongitude())
            ));
    }

    /**
     * Calculate distance between two points in latitude and longitude using the Haversine formula.
     * @param lat1 Latitude of point 1
     * @param lon1 Longitude of point 1
     * @param lat2 Latitude of point 2
     * @param lon2 Longitude of point 2
     * @return Distance in kilometers.
     */
    private double distance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
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
