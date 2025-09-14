package com.healthcare.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.service.JwtUtil;
import com.healthcare.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // Inner class for Login Request
    public static class LoginRequest {
        private String email;
        private String password;
        private String userType;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getUserType() { return userType; }
        public void setUserType(String userType) { this.userType = userType; }
    }

    // Inner class for Signup Request, matching frontend's formData
    public static class SignupRequest {
        private String email;
        private String password;
        private String userType;
        private String fullName;
        private String phone;
        private String dateOfBirth;
        private String gender;
        private String address;
        private String city;
        private String state;
        private String zipCode;
        private String bloodType;
        private String allergies;
        private String medicalConditions;
        private String currentMedications;
        private String emergencyContactName;
        private String emergencyContactPhone;
        private String emergencyContactRelation;
        private String preferredHospital;
        private String insuranceProvider;
        private String insurancePolicyNumber;
        private String licenseNumber;
        private String specialization;
        private String medicalDegree;
        private String yearsOfExperience;
        private String hospitalAffiliation;
        private boolean allowEmergencyServices;
        private boolean allowAIAnalysis;
        private boolean allowDataSharing;
        private boolean enableLocationServices;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getUserType() { return userType; }
        public void setUserType(String userType) { this.userType = userType; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getDateOfBirth() { return dateOfBirth; }
        public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
        public String getGender() { return gender; }
        public void setGender(String gender) { this.gender = gender; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }
        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
        public String getZipCode() { return zipCode; }
        public void setZipCode(String zipCode) { this.zipCode = zipCode; }
        public String getBloodType() { return bloodType; }
        public void setBloodType(String bloodType) { this.bloodType = bloodType; }
        public String getAllergies() { return allergies; }
        public void setAllergies(String allergies) { this.allergies = allergies; }
        public String getMedicalConditions() { return medicalConditions; }
        public void setMedicalConditions(String medicalConditions) { this.medicalConditions = medicalConditions; }
        public String getCurrentMedications() { return currentMedications; }
        public void setCurrentMedications(String currentMedications) { this.currentMedications = currentMedications; }
        public String getEmergencyContactName() { return emergencyContactName; }
        public void setEmergencyContactName(String emergencyContactName) { this.emergencyContactName = emergencyContactName; }
        public String getEmergencyContactPhone() { return emergencyContactPhone; }
        public void setEmergencyContactPhone(String emergencyContactPhone) { this.emergencyContactPhone = emergencyContactPhone; }
        public String getEmergencyContactRelation() { return emergencyContactRelation; }
        public void setEmergencyContactRelation(String emergencyContactRelation) { this.emergencyContactRelation = emergencyContactRelation; }
        public String getPreferredHospital() { return preferredHospital; }
        public void setPreferredHospital(String preferredHospital) { this.preferredHospital = preferredHospital; }
        public String getInsuranceProvider() { return insuranceProvider; }
        public void setInsuranceProvider(String insuranceProvider) { this.insuranceProvider = insuranceProvider; }
        public String getInsurancePolicyNumber() { return insurancePolicyNumber; }
        public void setInsurancePolicyNumber(String insurancePolicyNumber) { this.insurancePolicyNumber = insurancePolicyNumber; }
        public String getLicenseNumber() { return licenseNumber; }
        public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }
        public String getMedicalDegree() { return medicalDegree; }
        public void setMedicalDegree(String medicalDegree) { this.medicalDegree = medicalDegree; }
        public String getYearsOfExperience() { return yearsOfExperience; }
        public void setYearsOfExperience(String yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }
        public String getHospitalAffiliation() { return hospitalAffiliation; }
        public void setHospitalAffiliation(String hospitalAffiliation) { this.hospitalAffiliation = hospitalAffiliation; }
        public boolean isAllowEmergencyServices() { return allowEmergencyServices; }
        public void setAllowEmergencyServices(boolean allowEmergencyServices) { this.allowEmergencyServices = allowEmergencyServices; }
        public boolean isAllowAIAnalysis() { return allowAIAnalysis; }
        public void setAllowAIAnalysis(boolean allowAIAnalysis) { this.allowAIAnalysis = allowAIAnalysis; }
        public boolean isAllowDataSharing() { return allowDataSharing; }
        public void setAllowDataSharing(boolean allowDataSharing) { this.allowDataSharing = allowDataSharing; }
        public boolean isEnableLocationServices() { return enableLocationServices; }
        public void setEnableLocationServices(boolean enableLocationServices) { this.enableLocationServices = enableLocationServices; }
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Incorrect username or password"));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new Exception("User not found with email: " + loginRequest.getEmail()));

        if (!user.getUserType().equals(loginRequest.getUserType())) {
            return ResponseEntity.status(401).body(Map.of("message", "User found, but with a different role. Please use the correct login tab."));
        }

        final String jwt = jwtUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("userId", user.getId());
        response.put("userType", user.getUserType());
        response.put("fullName", user.getFullName());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            User registeredUser = userService.registerUser(signupRequest);
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.getId());
            response.put("email", registeredUser.getEmail());
            response.put("userType", registeredUser.getUserType());
            response.put("fullName", registeredUser.getFullName());
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable String userId) {
        return userService.findById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String userId, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(userId, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/clean-duplicates")
    public ResponseEntity<?> cleanDuplicateUsers() {
        List<String> idsToDelete = userService.findDuplicateUserIdsToDelete();
        if (!idsToDelete.isEmpty()) {
            userService.deleteUsersByIds(idsToDelete);
            return ResponseEntity.ok("Deleted " + idsToDelete.size() + " duplicate users.");
        }
        return ResponseEntity.ok("No duplicate users found.");
    }
}