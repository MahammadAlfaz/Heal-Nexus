import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { approveDoctor, rejectDoctor, fetchDoctors } from '../utils/api';

// Types for our data structures
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  rating: number;
  distance: string;
  emergencyServices: boolean;
  verified: boolean;
  image: string;
  coordinates: { lat: number; lng: number };
  healthCards: string[];
  facilities: string[];
  reviewCount: number;
  generalBeds: number;
  icuBeds: number;
  emergencyBeds: number;
}

export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  medicalDegree: string;
  hospitalAffiliation: string;
  yearsOfExperience: string;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  onlineConsultation: boolean;
  nextAvailable: string;
  verified: boolean;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  verificationDate?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  emergencyContact: string;
  medicalHistory: string[];
  registrationDate: string;
  status: 'active' | 'inactive';
}

export interface EmergencyService {
  id: string;
  name: string;
  phone: string;
  type: 'ambulance' | 'fire' | 'police' | 'poison-control';
  coverage: string[];
  responseTime: string;
  available: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  description: string;
  sideEffects: string[];
  dosage: string;
  price: number;
  category: string;
  verified: boolean;
}

interface AppDataContextType {
  // Hospitals
  hospitals: Hospital[];
  addHospital: (hospital: Omit<Hospital, 'id'>) => void;
  updateHospital: (id: string, hospital: Partial<Hospital>) => void;
  deleteHospital: (id: string) => void;

  // Doctors
  doctors: Doctor[];
  loadDoctors: () => Promise<void>;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  verifyDoctor: (email: string, status: 'approved' | 'rejected') => Promise<void>;
  deleteDoctor: (id: string) => void;

  // Patients
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  // Emergency Services
  emergencyServices: EmergencyService[];
  updateEmergencyService: (id: string, service: Partial<EmergencyService>) => void;

  // Medicines
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => void;
  updateMedicine: (id: string, medicine: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;

  // System Stats
  systemStats: {
    totalUsers: number;
    totalDoctors: number;
    totalPatients: number;
    totalHospitals: number;
    pendingVerifications: number;
    emergencyCalls: number;
    appointmentsToday: number;
  };
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with sample data
  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'Manipal Hospital, Hebbal',
      address: '98, HAL Airport Rd, Kodihalli, Bengaluru, Karnataka 560017',
      phone: '080 2509 4444',
      email: 'info@manipalhospitals.com',
      specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Emergency Medicine'],
      rating: 4.6,
      distance: '5.2 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 13.0827, lng: 77.6407 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana', 'CGHS (Central Government Health Scheme)', 'ESI (Employee State Insurance)'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology', 'Surgery Center', 'MRI Center'],
      reviewCount: 1250,
      generalBeds: 150,
      icuBeds: 25,
      emergencyBeds: 10
    },
    {
      id: '2',
      name: 'Columbia Asia Hospital, Hebbal',
      address: 'Kirloskar Business Park, Bellary Rd, Hebbal, Bengaluru, Karnataka 560024',
      phone: '080 4179 1000',
      email: 'info@columbiaasia.com',
      specialties: ['Cardiology', 'Neurology', 'Pediatrics', 'Gynecology', 'Dermatology'],
      rating: 4.4,
      distance: '4.8 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 13.0500, lng: 77.5917 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana', 'State Government Health Insurance', 'Private Health Insurance'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology', 'Maternity Ward'],
      reviewCount: 980,
      generalBeds: 120,
      icuBeds: 20,
      emergencyBeds: 8
    },
    {
      id: '3',
      name: 'Fortis Hospital, Rajajinagar',
      address: '14, Cunningham Rd, Bengaluru, Karnataka 560052',
      phone: '080 6621 4444',
      email: 'info@fortishealthcare.com',
      specialties: ['Cardiology', 'Oncology', 'Surgery', 'Internal Medicine', 'Radiology'],
      rating: 4.5,
      distance: '6.1 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 12.9850, lng: 77.5950 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'CGHS (Central Government Health Scheme)', 'ESI (Employee State Insurance)', 'Private Health Insurance'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology', 'Cancer Center'],
      reviewCount: 1450,
      generalBeds: 180,
      icuBeds: 30,
      emergencyBeds: 12
    },
    {
      id: '4',
      name: 'Ramaiah Memorial Hospital',
      address: 'MSRIT Post, MSR Nagar, Bengaluru, Karnataka 560054',
      phone: '080 2360 9999',
      email: 'info@msrmc.org',
      specialties: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Emergency Medicine'],
      rating: 4.3,
      distance: '7.3 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 12.9279, lng: 77.5649 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana', 'State Government Health Insurance'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology', 'Surgery Center'],
      reviewCount: 1100,
      generalBeds: 200,
      icuBeds: 35,
      emergencyBeds: 15
    },
    {
      id: '5',
      name: 'St. Philomena\'s Hospital',
      address: '4, Mother Teresa Rd, Viveknagar, Bengaluru, Karnataka 560047',
      phone: '080 2552 2000',
      email: 'info@stphilomenahospital.com',
      specialties: ['Cardiology', 'Neurology', 'Oncology', 'Gynecology', 'Pediatrics'],
      rating: 4.2,
      distance: '5.9 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 12.9650, lng: 77.5960 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'CGHS (Central Government Health Scheme)', 'ESI (Employee State Insurance)'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology', 'Maternity Ward'],
      reviewCount: 950,
      generalBeds: 160,
      icuBeds: 28,
      emergencyBeds: 10
    },
    {
      id: '6',
      name: 'Victoria Hospital',
      address: 'Fort Rd, near City Market, Bengaluru, Karnataka 560002',
      phone: '080 2670 1150',
      email: 'info@victoriahospital.com',
      specialties: ['Emergency Medicine', 'Surgery', 'Internal Medicine', 'Pediatrics'],
      rating: 4.1,
      distance: '6.5 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 12.9716, lng: 77.5764 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana', 'State Government Health Insurance'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology'],
      reviewCount: 800,
      generalBeds: 250,
      icuBeds: 40,
      emergencyBeds: 20
    },
    {
      id: '7',
      name: 'Bowring & Lady Curzon Hospital',
      address: 'Shivaji Nagar, Bengaluru, Karnataka 560001',
      phone: '080 2559 1300',
      email: 'info@bowringhospital.com',
      specialties: ['Internal Medicine', 'Surgery', 'Pediatrics', 'Gynecology'],
      rating: 4.0,
      distance: '5.7 km',
      emergencyServices: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      coordinates: { lat: 12.9850, lng: 77.6040 },
      healthCards: ['ABHA (Ayushman Bharat Health Account)', 'CGHS (Central Government Health Scheme)', 'ESI (Employee State Insurance)'],
      facilities: ['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology'],
      reviewCount: 700,
      generalBeds: 180,
      icuBeds: 25,
      emergencyBeds: 12
    }
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 555-1234',
      age: 45,
      gender: 'Male',
      emergencyContact: '(555) 555-5678',
      medicalHistory: ['Hypertension', 'Diabetes Type 2'],
      registrationDate: '2024-01-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '(555) 555-9876',
      age: 32,
      gender: 'Female',
      emergencyContact: '(555) 555-4321',
      medicalHistory: ['Asthma'],
      registrationDate: '2024-01-12',
      status: 'active'
    }
  ]);

  const [emergencyServices, setEmergencyServices] = useState<EmergencyService[]>([
    {
      id: '1',
      name: 'City Emergency Medical Services',
      phone: '911',
      type: 'ambulance',
      coverage: ['Downtown', 'Medical District', 'Suburbs'],
      responseTime: '8-12 minutes',
      available: true
    },
    {
      id: '2',
      name: 'Poison Control Center',
      phone: '1-800-222-1222',
      type: 'poison-control',
      coverage: ['Nationwide'],
      responseTime: 'Immediate',
      available: true
    }
  ]);

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Acetaminophen',
      genericName: 'Paracetamol',
      manufacturer: 'Johnson & Johnson',
      description: 'Pain reliever and fever reducer',
      sideEffects: ['Nausea', 'Vomiting', 'Loss of appetite'],
      dosage: '500mg every 4-6 hours',
      price: 12.99,
      category: 'Pain Relief',
      verified: true
    },
    {
      id: '2',
      name: 'Lisinopril',
      genericName: 'Lisinopril',
      manufacturer: 'Merck',
      description: 'ACE inhibitor for high blood pressure',
      sideEffects: ['Dizziness', 'Cough', 'Hyperkalemia'],
      dosage: '10mg once daily',
      price: 25.50,
      category: 'Cardiovascular',
      verified: true
    }
  ]);

  // Hospital management functions
  const addHospital = (hospital: Omit<Hospital, 'id'>) => {
    const newHospital = { ...hospital, id: Date.now().toString() };
    setHospitals(prev => [...prev, newHospital]);
  };

  const updateHospital = (id: string, hospital: Partial<Hospital>) => {
    setHospitals(prev => prev.map(h => h.id === id ? { ...h, ...hospital } : h));
  };

  const deleteHospital = (id: string) => {
    setHospitals(prev => prev.filter(h => h.id !== id));
  };

  // Doctor management functions
  const loadDoctors = async () => {
    try {
      const backendDoctors = await fetchDoctors();
      const mappedDoctors: Doctor[] = backendDoctors.map((backendDoc: any) => ({
        id: backendDoc.id,
        fullName: backendDoc.fullName,
        email: backendDoc.email,
        phone: backendDoc.phone,
        specialization: backendDoc.specialization,
        licenseNumber: backendDoc.licenseNumber,
        medicalDegree: backendDoc.medicalDegree,
        hospitalAffiliation: backendDoc.hospitalAffiliation,
        yearsOfExperience: backendDoc.yearsOfExperience,
        rating: backendDoc.rating || 0,
        reviewCount: backendDoc.reviewCount || 0,
        consultationFee: backendDoc.consultationFee || 0,
        onlineConsultation: backendDoc.onlineConsultation || false,
        nextAvailable: backendDoc.nextAvailable || '',
        verified: backendDoc.approved || false,
        photoUrl: backendDoc.photoUrl,
        status: (backendDoc.approved ? 'approved' : 'pending') as 'pending' | 'approved',
        verificationDate: backendDoc.approved ? new Date().toISOString() : undefined,
      }));
      setDoctors(mappedDoctors);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    }
  };

  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    const newDoctor = { ...doctor, id: Date.now().toString() };
    setDoctors(prev => [...prev, newDoctor]);
  };

  const updateDoctor = (id: string, doctor: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...doctor } : d));
  };

  const verifyDoctor = async (email: string, status: 'approved' | 'rejected') => {
    try {
      if (status === 'approved') {
        await approveDoctor(email);
      } else {
        await rejectDoctor(email);
      }
      // Reload doctors from backend to get updated status
      await loadDoctors();
    } catch (error) {
      console.error('Failed to verify doctor:', error);
      throw error;
    }
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  // Patient management functions
  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (id: string, patient: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...patient } : p));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  // Emergency service management
  const updateEmergencyService = (id: string, service: Partial<EmergencyService>) => {
    setEmergencyServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  };

  // Medicine management functions
  const addMedicine = (medicine: Omit<Medicine, 'id'>) => {
    const newMedicine = { ...medicine, id: Date.now().toString() };
    setMedicines(prev => [...prev, newMedicine]);
  };

  const updateMedicine = (id: string, medicine: Partial<Medicine>) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, ...medicine } : m));
  };

  const deleteMedicine = (id: string) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  // Load doctors from backend on mount
  useEffect(() => {
    loadDoctors();
  }, []);

  // Calculate system stats
  const systemStats = {
    totalUsers: patients.length + doctors.length,
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    totalHospitals: hospitals.length,
    pendingVerifications: doctors.filter(d => d.status === 'pending').length,
    emergencyCalls: 45, // This would come from a real system
    appointmentsToday: 23 // This would come from a real system
  };

  const value: AppDataContextType = {
    hospitals,
    addHospital,
    updateHospital,
    deleteHospital,
    doctors,
    loadDoctors,
    addDoctor,
    updateDoctor,
    verifyDoctor,
    deleteDoctor,
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    emergencyServices,
    updateEmergencyService,
    medicines,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    systemStats
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};
