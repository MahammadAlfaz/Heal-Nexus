package com.healthcare.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hospitals")
public class Hospital {

    @Id
    private String id;

    private String name;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phone;
    private String email;
    private String website;

    // Location coordinates for distance calculations
    private Double latitude;
    private Double longitude;

    // Hospital details
    private String type; // "general", "specialty", "clinic", etc.
    private String ownership; // "private", "government", "non-profit"
    private Integer bedCount;
    private String emergencyServices; // "yes", "no"

    // Services offered
    private String[] services;
    private String[] specialties;

    // Operating hours
    private String operatingHours;

    // Rating and reviews
    private Double rating;
    private Integer reviewCount;

    // Insurance accepted
    private String[] acceptedInsurances;

    // Contact information
    private String emergencyContact;
    private String appointmentContact;

    // Image URL for hospital
    private String imageUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public Hospital() {}

    public Hospital(String name, String address, String city, String state, String zipCode) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getOwnership() { return ownership; }
    public void setOwnership(String ownership) { this.ownership = ownership; }

    public Integer getBedCount() { return bedCount; }
    public void setBedCount(Integer bedCount) { this.bedCount = bedCount; }

    public String getEmergencyServices() { return emergencyServices; }
    public void setEmergencyServices(String emergencyServices) { this.emergencyServices = emergencyServices; }

    public String[] getServices() { return services; }
    public void setServices(String[] services) { this.services = services; }

    public String[] getSpecialties() { return specialties; }
    public void setSpecialties(String[] specialties) { this.specialties = specialties; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public String[] getAcceptedInsurances() { return acceptedInsurances; }
    public void setAcceptedInsurances(String[] acceptedInsurances) { this.acceptedInsurances = acceptedInsurances; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public String getAppointmentContact() { return appointmentContact; }
    public void setAppointmentContact(String appointmentContact) { this.appointmentContact = appointmentContact; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
