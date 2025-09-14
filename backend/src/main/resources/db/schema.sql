-- Users table for patients and doctors
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL, -- 'patient' or 'doctor'
    full_name VARCHAR(255),
    phone VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),

    -- Medical Information (for patients)
    blood_type VARCHAR(10),
    allergies TEXT,
    medical_conditions TEXT,
    current_medications TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    emergency_contact_relation VARCHAR(100),
    preferred_hospital VARCHAR(255),
    insurance_provider VARCHAR(255),
    insurance_policy_number VARCHAR(100),

    -- Healthcare Professional Information (for doctors)
    license_number VARCHAR(100),
    specialization VARCHAR(255),
    medical_degree VARCHAR(255),
    years_of_experience VARCHAR(50),
    hospital_affiliation VARCHAR(255),

    -- Preferences
    allow_emergency_services BOOLEAN DEFAULT FALSE,
    allow_ai_analysis BOOLEAN DEFAULT FALSE,
    allow_data_sharing BOOLEAN DEFAULT FALSE,
    enable_location_services BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical reports table
CREATE TABLE medical_reports (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES users(id),
    doctor_id INT REFERENCES users(id),
    report_type VARCHAR(100),
    report_date DATE,
    status VARCHAR(50),
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES users(id),
    doctor_id INT NOT NULL REFERENCES users(id),
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prescriptions table
CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES users(id),
    doctor_id INT NOT NULL REFERENCES users(id),
    medication TEXT,
    dosage TEXT,
    instructions TEXT,
    prescribed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES users(id),
    name VARCHAR(255),
    relationship VARCHAR(100),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
