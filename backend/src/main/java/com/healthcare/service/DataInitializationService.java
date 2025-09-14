package com.healthcare.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.healthcare.model.Hospital;
import com.healthcare.repository.HospitalRepository;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public void run(String... args) throws Exception {
        // Always initialize hospital data for now
        initializeHospitalData();
    }

    private void initializeHospitalData() {
        LocalDateTime now = LocalDateTime.now();

        // Apollo Hospitals Chennai
        Hospital hospital1 = new Hospital();
        hospital1.setName("Apollo Hospitals");
        hospital1.setAddress("21 Greams Lane, Off Greams Road");
        hospital1.setCity("Chennai");
        hospital1.setState("Tamil Nadu");
        hospital1.setZipCode("600006");
        hospital1.setPhone("+91-44-2829-3333");
        hospital1.setEmail("info@apollohospitals.com");
        hospital1.setWebsite("https://www.apollohospitals.com");
        hospital1.setLatitude(13.0827);
        hospital1.setLongitude(80.2707);
        hospital1.setType("general");
        hospital1.setOwnership("private");
        hospital1.setBedCount(1000);
        hospital1.setEmergencyServices("yes");
        hospital1.setServices(new String[]{"Emergency Care", "Surgery", "Cardiology", "Oncology", "Neurology"});
        hospital1.setSpecialties(new String[]{"Cardiology", "Neurology", "Orthopedics", "Oncology"});
        hospital1.setOperatingHours("24/7");
        hospital1.setRating(4.5);
        hospital1.setReviewCount(2500);
        hospital1.setAcceptedInsurances(new String[]{"Star Health", "ICICI Lombard", "Bajaj Allianz"});
        hospital1.setEmergencyContact("+91-44-2829-3333");
        hospital1.setAppointmentContact("+91-44-2829-3334");
        hospital1.setImageUrl("https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop");
        hospital1.setCreatedAt(now);
        hospital1.setUpdatedAt(now);

        // Max Super Speciality Hospital Delhi
        Hospital hospital2 = new Hospital();
        hospital2.setName("Max Super Speciality Hospital");
        hospital2.setAddress("FC-50, C & D Block, Shalimar Bagh");
        hospital2.setCity("New Delhi");
        hospital2.setState("Delhi");
        hospital2.setZipCode("110088");
        hospital2.setPhone("+91-11-6642-2222");
        hospital2.setEmail("info@maxhealthcare.com");
        hospital2.setWebsite("https://www.maxhealthcare.in");
        hospital2.setLatitude(28.7176);
        hospital2.setLongitude(77.1636);
        hospital2.setType("general");
        hospital2.setOwnership("private");
        hospital2.setBedCount(500);
        hospital2.setEmergencyServices("yes");
        hospital2.setServices(new String[]{"Emergency Care", "Surgery", "Cardiology", "Orthopedics"});
        hospital2.setSpecialties(new String[]{"Cardiology", "Orthopedics", "Neurology", "Gastroenterology"});
        hospital2.setOperatingHours("24/7");
        hospital2.setRating(4.3);
        hospital2.setReviewCount(1800);
        hospital2.setAcceptedInsurances(new String[]{"Max Bupa", "Star Health", "HDFC ERGO"});
        hospital2.setEmergencyContact("+91-11-6642-2222");
        hospital2.setAppointmentContact("+91-11-6642-2223");
        hospital2.setImageUrl("https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop");
        hospital2.setCreatedAt(now);
        hospital2.setUpdatedAt(now);

        // Fortis Hospital Mohali
        Hospital hospital3 = new Hospital();
        hospital3.setName("Fortis Hospital");
        hospital3.setAddress("Sector 62, Phase-VIII, Mohali");
        hospital3.setCity("Mohali");
        hospital3.setState("Punjab");
        hospital3.setZipCode("160062");
        hospital3.setPhone("+91-172-469-2222");
        hospital3.setEmail("info@fortishealthcare.com");
        hospital3.setWebsite("https://www.fortishealthcare.com");
        hospital3.setLatitude(30.7046);
        hospital3.setLongitude(76.7179);
        hospital3.setType("general");
        hospital3.setOwnership("private");
        hospital3.setBedCount(300);
        hospital3.setEmergencyServices("yes");
        hospital3.setServices(new String[]{"Emergency Care", "Cardiology", "Oncology", "Nephrology"});
        hospital3.setSpecialties(new String[]{"Cardiology", "Oncology", "Nephrology", "Urology"});
        hospital3.setOperatingHours("24/7");
        hospital3.setRating(4.4);
        hospital3.setReviewCount(1500);
        hospital3.setAcceptedInsurances(new String[]{"ICICI Lombard", "Bajaj Allianz", "Reliance General"});
        hospital3.setEmergencyContact("+91-172-469-2222");
        hospital3.setAppointmentContact("+91-172-469-2223");
        hospital3.setImageUrl("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop");
        hospital3.setCreatedAt(now);
        hospital3.setUpdatedAt(now);

        // Manipal Hospitals Bangalore
        Hospital hospital4 = new Hospital();
        hospital4.setName("Manipal Hospitals");
        hospital4.setAddress("98, HAL Airport Road");
        hospital4.setCity("Bangalore");
        hospital4.setState("Karnataka");
        hospital4.setZipCode("560017");
        hospital4.setPhone("+91-80-2502-4444");
        hospital4.setEmail("info@manipalhospitals.com");
        hospital4.setWebsite("https://www.manipalhospitals.com");
        hospital4.setLatitude(12.9600);
        hospital4.setLongitude(77.6480);
        hospital4.setType("general");
        hospital4.setOwnership("private");
        hospital4.setBedCount(600);
        hospital4.setEmergencyServices("yes");
        hospital4.setServices(new String[]{"Emergency Care", "Surgery", "Cardiology", "Neurology"});
        hospital4.setSpecialties(new String[]{"Cardiology", "Neurology", "Orthopedics", "Gastroenterology"});
        hospital4.setOperatingHours("24/7");
        hospital4.setRating(4.6);
        hospital4.setReviewCount(2200);
        hospital4.setAcceptedInsurances(new String[]{"Star Health", "Apollo Munich", "HDFC ERGO"});
        hospital4.setEmergencyContact("+91-80-2502-4444");
        hospital4.setAppointmentContact("+91-80-2502-4445");
        hospital4.setImageUrl("https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop");
        hospital4.setCreatedAt(now);
        hospital4.setUpdatedAt(now);

        // AIIMS Delhi
        Hospital hospital5 = new Hospital();
        hospital5.setName("AIIMS Delhi");
        hospital5.setAddress("Ansari Nagar");
        hospital5.setCity("New Delhi");
        hospital5.setState("Delhi");
        hospital5.setZipCode("110029");
        hospital5.setPhone("+91-11-2658-8500");
        hospital5.setEmail("info@aiims.edu");
        hospital5.setWebsite("https://www.aiims.edu");
        hospital5.setLatitude(28.5672);
        hospital5.setLongitude(77.2100);
        hospital5.setType("teaching");
        hospital5.setOwnership("government");
        hospital5.setBedCount(2000);
        hospital5.setEmergencyServices("yes");
        hospital5.setServices(new String[]{"Emergency Care", "Research", "Education", "All Specialties"});
        hospital5.setSpecialties(new String[]{"All Medical Specialties", "Research", "Education"});
        hospital5.setOperatingHours("24/7");
        hospital5.setRating(4.7);
        hospital5.setReviewCount(3500);
        hospital5.setAcceptedInsurances(new String[]{"CGHS", "ESI", "Private Insurance"});
        hospital5.setEmergencyContact("+91-11-2658-8500");
        hospital5.setAppointmentContact("+91-11-2658-8501");
        hospital5.setImageUrl("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop");
        hospital5.setCreatedAt(now);
        hospital5.setUpdatedAt(now);

        // Save all hospitals
        hospitalRepository.save(hospital1);
        hospitalRepository.save(hospital2);
        hospitalRepository.save(hospital3);
        hospitalRepository.save(hospital4);
        hospitalRepository.save(hospital5);

        System.out.println("Hospital data initialized successfully!");
    }
}
