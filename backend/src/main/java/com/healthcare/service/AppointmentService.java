package com.healthcare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.model.User;
import com.healthcare.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public boolean isSlotAvailable(Doctor doctor, LocalDateTime appointmentDate) {
        // Check if there's any existing appointment for this doctor at the exact same time
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorAndAppointmentDate(doctor, appointmentDate);
        return existingAppointments.isEmpty();
    }

    public Appointment createAppointment(User patient, Doctor doctor, LocalDateTime appointmentDate, String status, String notes) {
        if (!isSlotAvailable(doctor, appointmentDate)) {
            throw new RuntimeException("Time slot is not available for this doctor");
        }
        Appointment appointment = new Appointment(patient, doctor, appointmentDate, status, notes);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatient(User patient) {
        return appointmentRepository.findByPatient(patient);
    }

    public List<Appointment> getAppointmentsByDoctor(Doctor doctor) {
        return appointmentRepository.findByDoctor(doctor);
    }

    public List<Appointment> getUpcomingAppointmentsByPatient(User patient) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = now.plusMonths(6);
        return appointmentRepository.findByPatientAndAppointmentDateBetween(patient, now, future);
    }

    public List<Appointment> getUpcomingAppointmentsByDoctor(Doctor doctor) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = now.plusMonths(6);
        return appointmentRepository.findByDoctorAndAppointmentDateBetween(doctor, now, future);
    }

    public Appointment updateAppointmentStatus(String appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByDoctorAndDate(Doctor doctor, LocalDateTime date) {
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59);
        return appointmentRepository.findByDoctorAndAppointmentDateBetween(doctor, startOfDay, endOfDay);
    }

    public long count() {
        return appointmentRepository.count();
    }
}
