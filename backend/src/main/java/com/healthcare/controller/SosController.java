package com.healthcare.controller;

import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.service.SosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/sos")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) // Adjust as needed
public class SosController {

    @Autowired
    private SosService sosService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/share-location")
    public ResponseEntity<?> shareLocation(@RequestBody Map<String, Double> location) {
        // 1. Get the currently authenticated user
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        User currentUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in database"));

        // 2. Get user's emergency contact and location data
        String emergencyContact = currentUser.getEmergencyContactPhone();
        if (emergencyContact == null || emergencyContact.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("User has not set an emergency contact.");
        }

        Double latitude = location.get("latitude");
        Double longitude = location.get("longitude");

        if (latitude == null || longitude == null) {
            return ResponseEntity.badRequest().body("Latitude and longitude are required.");
        }

        // 3. Send the WhatsApp message
        sosService.sendEmergencyLocation(emergencyContact, latitude, longitude, currentUser.getFullName());

        return ResponseEntity.ok("Emergency location shared successfully.");
    }
}
