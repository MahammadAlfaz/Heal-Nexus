package com.healthcare.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.model.Appointment;
import com.healthcare.model.User;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctor(User doctor);
    List<Appointment> findByPatientAndAppointmentDateBetween(User patient, LocalDateTime start, LocalDateTime end);
    List<Appointment> findByDoctorAndAppointmentDateBetween(User doctor, LocalDateTime start, LocalDateTime end);
}
