package com.healthcare.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.model.Appointment;
import com.healthcare.model.Doctor;
import com.healthcare.model.User;
import com.healthcare.service.AppointmentService;
import com.healthcare.service.DoctorService;
import com.healthcare.service.UserService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3005"})
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private DoctorService doctorService;

    // DTO to shape the appointment data for the frontend
    public static class AppointmentDTO {
        private String id;
        private String patientId;
        private String patientName;
        private String doctorId;
        private String doctorName;
        private String doctorSpecialization;
        private String appointmentDate;
        private String status;
        private String notes;

        public AppointmentDTO(Appointment appointment) {
            this.id = appointment.getId();
            if (appointment.getPatient() != null) {
                this.patientId = appointment.getPatient().getId();
                this.patientName = appointment.getPatient().getFullName();
            }
            if (appointment.getDoctor() != null) {
                this.doctorId = appointment.getDoctor().getId();
                this.doctorName = appointment.getDoctor().getFullName();
                this.doctorSpecialization = appointment.getDoctor().getSpecialization();
            }
            this.appointmentDate = appointment.getAppointmentDate().toString();
            this.status = appointment.getStatus();
            this.notes = appointment.getNotes();
        }

        // Getters are needed for JSON serialization
        public String getId() { return id; }
        public String getPatientId() { return patientId; }
        public String getPatientName() { return patientName; }
        public String getDoctorId() { return doctorId; }
        public String getDoctorName() { return doctorName; }
        public String getDoctorSpecialization() { return doctorSpecialization; }
        public String getAppointmentDate() { return appointmentDate; }
        public String getStatus() { return status; }
        public String getNotes() { return notes; }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByPatient(@PathVariable String patientId) {
        User patient = userService.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));
        List<Appointment> appointments = appointmentService.getAppointmentsByPatient(patient);
        List<AppointmentDTO> dtos = appointments.stream().map(AppointmentDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDoctor(@PathVariable String doctorId) {
        // Get the authenticated user's email from JWT
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String compositeUsername = authentication.getName();
        String authenticatedEmail = compositeUsername;
        // The username from JWT is in "email:userType" format, so we extract the email part.
        if (compositeUsername.contains(":")) {
            authenticatedEmail = compositeUsername.split(":")[0];
        }

        // First try to find by doctor ID
        Optional<Doctor> doctorOpt = doctorService.findById(doctorId);
        if (doctorOpt.isPresent()) {
            List<AppointmentDTO> dtos = appointmentService.getAppointmentsByDoctor(doctorOpt.get()).stream().map(AppointmentDTO::new).toList();
            return ResponseEntity.ok(dtos);
        }

        // If not found by ID, try to find by email (for JWT authentication)
        Optional<Doctor> doctorByEmail = doctorService.findByEmail(doctorId);
        if (doctorByEmail.isPresent()) {
            List<AppointmentDTO> dtos = appointmentService.getAppointmentsByDoctor(doctorByEmail.get()).stream().map(AppointmentDTO::new).toList();
            return ResponseEntity.ok(dtos);
        }

        // If still not found, try to find by authenticated user's email
        Optional<Doctor> doctorByAuthEmail = doctorService.findByEmail(authenticatedEmail);
        if (doctorByAuthEmail.isPresent()) {
            List<AppointmentDTO> dtos = appointmentService.getAppointmentsByDoctor(doctorByAuthEmail.get()).stream().map(AppointmentDTO::new).toList();
            return ResponseEntity.ok(dtos);
        }

        // If no doctor is found, it's not an error, just return an empty list.
        // This prevents a 500 error on the frontend if the doctor has no appointments.
        // The previous "Doctor not found" exception was likely causing issues.
        return ResponseEntity.ok(Collections.emptyList());
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody CreateAppointmentRequest request) {
        try {
            User patient = userService.findById(request.getPatientId()).orElseThrow(() -> new RuntimeException("Patient not found"));
            Doctor doctor = doctorService.findById(request.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found"));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime localDateTime = LocalDateTime.parse(request.getAppointmentDate(), formatter);
            Appointment newAppointment = appointmentService.createAppointment(patient, doctor, localDateTime, request.getStatus(), request.getNotes());
            return ResponseEntity.ok(new AppointmentDTO(newAppointment));
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not available")) {
                return ResponseEntity.badRequest().body("Time slot is not available for this doctor");
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<AppointmentDTO> updateAppointmentStatus(@PathVariable String appointmentId, @RequestBody UpdateStatusRequest request) {
        Appointment updatedAppointment = appointmentService.updateAppointmentStatus(appointmentId, request.getStatus());
        return ResponseEntity.ok(new AppointmentDTO(updatedAppointment));
    }

    @GetMapping("/doctor/{doctorId}/date/{date}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDoctorAndDate(@PathVariable String doctorId, @PathVariable String date) {
        // Get the authenticated user's email from JWT
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String compositeUsername = authentication.getName();
        String authenticatedEmail = compositeUsername;
        // The username from JWT is in "email:userType" format, so we extract the email part.
        if (compositeUsername.contains(":")) {
            authenticatedEmail = compositeUsername.split(":")[0];
        }

        // First try to find by doctor ID
        Optional<Doctor> doctorOpt = doctorService.findById(doctorId);
        if (doctorOpt.isPresent()) {
            LocalDate localDate = LocalDate.parse(date);
            LocalDateTime dateTime = localDate.atStartOfDay();
            List<AppointmentDTO> dtos = appointmentService.getAppointmentsByDoctorAndDate(doctorOpt.get(), dateTime).stream().map(AppointmentDTO::new).toList();
            return ResponseEntity.ok(dtos);
        }

        // If not found by ID, try to find by email (for JWT authentication)
        Optional<Doctor> doctorByEmail = doctorService.findByEmail(doctorId);
        if (doctorByEmail.isPresent()) {
            LocalDate localDate = LocalDate.parse(date);
            LocalDateTime dateTime = localDate.atStartOfDay();
            List<AppointmentDTO> dtos = appointmentService.getAppointmentsByDoctorAndDate(doctorByEmail.get(), dateTime).stream().map(AppointmentDTO::new).toList();
            return ResponseEntity.ok(dtos);
        }

        // If still not found, try to find by authenticated user's email
        Optional<Doctor> doctorByAuthEmail = doctorService.findByEmail(authenticatedEmail);
        if (doctorByAuthEmail.isPresent()) {
            LocalDate localDate = LocalDate.parse(date);
            LocalDateTime dateTime = localDate.atStartOfDay();
            List<AppointmentDTO> dtos = appointmentService.getAppointmentsByDoctorAndDate(doctorByAuthEmail.get(), dateTime).stream().map(AppointmentDTO::new).toList();
            return ResponseEntity.ok(dtos);
        }

        return ResponseEntity.ok(Collections.emptyList());
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
