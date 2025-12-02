package com.healthcare.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "doctors")
public class Doctor {

    @Id
    private String id;

    private String email;

    private String fullName;

    private String phone;

    private String licenseNumber;

    private String specialization;

    private String medicalDegree;

    private String yearsOfExperience;

    private String hospitalAffiliation;

    private String address;

    private String city;

    private String state;

    private String zipCode;

    private Double rating;

    private Integer reviewCount;

    private Double consultationFee;

    private Boolean onlineConsultation;

    private String nextAvailable;

    private String photoUrl;

    private String profileImage; // Base64 encoded image data

    private LocalDateTime createdAt;

    private Boolean approved;  // New field to track admin approval

    // Constructors
    public Doctor() {}

    public Doctor(String email, String fullName, String phone,
                  String licenseNumber, String specialization, String medicalDegree,
                  String yearsOfExperience, String hospitalAffiliation) {
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.licenseNumber = licenseNumber;
        this.specialization = specialization;
        this.medicalDegree = medicalDegree;
        this.yearsOfExperience = yearsOfExperience;
        this.hospitalAffiliation = hospitalAffiliation;
        this.createdAt = LocalDateTime.now();
        this.rating = 4.5; // Default rating
        this.reviewCount = 0;
        this.consultationFee = 800.0; // Default fee
        this.onlineConsultation = true;
        this.nextAvailable = "Available Today";
        this.approved = false; // Default to not approved
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

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

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Double getConsultationFee() { return consultationFee; }
    public void setConsultationFee(Double consultationFee) { this.consultationFee = consultationFee; }

    public Boolean getOnlineConsultation() { return onlineConsultation; }
    public void setOnlineConsultation(Boolean onlineConsultation) { this.onlineConsultation = onlineConsultation; }

    public String getNextAvailable() { return nextAvailable; }
    public void setNextAvailable(String nextAvailable) { this.nextAvailable = nextAvailable; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Boolean getApproved() { return approved; }
    public void setApproved(Boolean approved) { this.approved = approved; }
}
