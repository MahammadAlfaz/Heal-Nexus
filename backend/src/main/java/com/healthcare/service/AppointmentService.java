package com.healthcare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.model.Appointment;
import com.healthcare.model.User;
import com.healthcare.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(User patient, User doctor, LocalDateTime appointmentDate, String status, String notes) {
        Appointment appointment = new Appointment(patient, doctor, appointmentDate, status, notes);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatient(User patient) {
        return appointmentRepository.findByPatient(patient);
    }

    public List<Appointment> getAppointmentsByDoctor(User doctor) {
        return appointmentRepository.findByDoctor(doctor);
    }

    public List<Appointment> getUpcomingAppointmentsByPatient(User patient) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = now.plusMonths(6);
        return appointmentRepository.findByPatientAndAppointmentDateBetween(patient, now, future);
    }

    public List<Appointment> getUpcomingAppointmentsByDoctor(User doctor) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = now.plusMonths(6);
        return appointmentRepository.findByDoctorAndAppointmentDateBetween(doctor, now, future);
    }

    public Appointment updateAppointmentStatus(String appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
}
