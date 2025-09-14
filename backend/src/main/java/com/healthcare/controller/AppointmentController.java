package com.healthcare.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.Appointment;
import com.healthcare.model.User;
import com.healthcare.service.AppointmentService;
import com.healthcare.service.UserService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable String patientId) {
        User patient = userService.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));
        List<Appointment> appointments = appointmentService.getAppointmentsByPatient(patient);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable String doctorId) {
        User doctor = userService.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found"));
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctor(doctor);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody CreateAppointmentRequest request) {
        User patient = userService.findById(request.getPatientId()).orElseThrow(() -> new RuntimeException("Patient not found"));
        User doctor = userService.findById(request.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found"));
        Appointment appointment = appointmentService.createAppointment(patient, doctor, LocalDateTime.parse(request.getAppointmentDate()), request.getStatus(), request.getNotes());
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(@PathVariable String appointmentId, @RequestBody UpdateStatusRequest request) {
        Appointment appointment = appointmentService.updateAppointmentStatus(appointmentId, request.getStatus());
        return ResponseEntity.ok(appointment);
    }

    public static class CreateAppointmentRequest {
        private String patientId;
        private String doctorId;
        private String appointmentDate;
        private String status;
        private String notes;

        // Getters and Setters
        public String getPatientId() { return patientId; }
        public void setPatientId(String patientId) { this.patientId = patientId; }
        public String getDoctorId() { return doctorId; }
        public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
        public String getAppointmentDate() { return appointmentDate; }
        public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    public static class UpdateStatusRequest {
        private String status;

        // Getters and Setters
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
