package com.healthcare.service;

import org.springframework.stereotype.Service;

@Service
public class SosService {

    /**
     * Sends emergency location to the given emergency contact.
     * Currently, this is a placeholder implementation.
     * 
     * @param emergencyContactPhone the phone number of the emergency contact
     * @param latitude Latitude of the current user's location
     * @param longitude Longitude of the current user's location
     * @param userFullName Full name of the current user
     */
    public void sendEmergencyLocation(String emergencyContactPhone, Double latitude, Double longitude, String userFullName) {
        // Placeholder implementation: Log/send message logic should be here
        System.out.println("Sending emergency location...");
        System.out.println("To: " + emergencyContactPhone);
        System.out.println("User: " + userFullName);
        System.out.println("Location: " + latitude + ", " + longitude);
        // Actual integration with messaging service (e.g., WhatsApp API) should be implemented here.
    }
}
