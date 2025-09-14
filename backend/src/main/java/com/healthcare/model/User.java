package com.healthcare.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@CompoundIndex(name = "email_userType_unique", def = "{'email': 1, 'userType': 1}", unique = true)
public class User {

    @Id
    private String id;

    private String email;

    private String passwordHash;

    private String userType; // "patient" or "doctor"

    private String fullName;

    private String phone;

    private String dateOfBirth;

    private String gender;

    private String address;

    private String city;

    private String state;

    private String zipCode;

    // Medical Information (for patients)
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

    // Healthcare Professional Information (for doctors)
    private String licenseNumber;

    private String specialization;

    private String medicalDegree;

    private String yearsOfExperience;

    private String hospitalAffiliation;

    // Preferences
    private Boolean allowEmergencyServices;

    private Boolean allowAIAnalysis;

    private Boolean allowDataSharing;

    private Boolean enableLocationServices;

    private LocalDateTime createdAt;

    // Constructors
    public User() {}

    public User(String email, String passwordHash, String userType, String fullName) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.userType = userType;
        this.fullName = fullName;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

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

    public Boolean getAllowEmergencyServices() { return allowEmergencyServices; }
    public void setAllowEmergencyServices(Boolean allowEmergencyServices) { this.allowEmergencyServices = allowEmergencyServices; }

    public Boolean getAllowAIAnalysis() { return allowAIAnalysis; }
    public void setAllowAIAnalysis(Boolean allowAIAnalysis) { this.allowAIAnalysis = allowAIAnalysis; }

    public Boolean getAllowDataSharing() { return allowDataSharing; }
    public void setAllowDataSharing(Boolean allowDataSharing) { this.allowDataSharing = allowDataSharing; }

    public Boolean getEnableLocationServices() { return enableLocationServices; }
    public void setEnableLocationServices(Boolean enableLocationServices) { this.enableLocationServices = enableLocationServices; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
