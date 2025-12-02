package com.healthcare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.model.Doctor;
import com.healthcare.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> findById(String id) {
        return doctorRepository.findById(id);
    }

    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteById(String id) {
        doctorRepository.deleteById(id);
    }

    public List<Doctor> findBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    public List<Doctor> findByHospitalAffiliation(String hospitalAffiliation) {
        return doctorRepository.findByHospitalAffiliation(hospitalAffiliation);
    }

    public Optional<Doctor> findByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public boolean isDoctorApproved(String email) {
        Optional<Doctor> doctor = findByEmail(email);
        return doctor.isPresent() && doctor.get().getApproved() != null && doctor.get().getApproved();
    }

    public void approveDoctor(String email) {
        Optional<Doctor> doctorOpt = findByEmail(email);
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            doctor.setApproved(true);
            save(doctor);
        }
    }

    public void rejectDoctor(String email) {
        Optional<Doctor> doctorOpt = findByEmail(email);
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            doctor.setApproved(false);
            save(doctor);
        }
    }
}
