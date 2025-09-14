import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ReportUpload } from './components/ReportUpload';
import { ReportViewer } from './components/ReportViewer';
import { EmergencyServices } from './components/EmergencyServices';
import { MedicineScanner } from './components/MedicineScanner';
import { HealthAssistant } from './components/HealthAssistant';
import { HomeServices } from './components/HomeServices';
import { HospitalFinder } from './components/HospitalFinder';
import { AppointmentBooking } from './components/AppointmentBooking';
import { CommunitySupport } from './components/CommunitySupport';
import { CostEstimator } from './components/CostEstimator';
import { PickupService } from './components/PickupService';
import { EmergencyResponse } from './components/EmergencyResponse';
import { MedicineVerification } from './components/MedicineVerification';
import { ReportAnalysis } from './components/ReportAnalysis';
import { AppointmentManagement } from './components/AppointmentManagement';
import { PatientMonitoring } from './components/PatientMonitoring';

import { TelehealthConsultation } from './components/TelehealthConsultation';
import { HospitalDetails } from './components/HospitalDetails';
import { AddHospitalPage } from './components/AddHospitalPage';
import { EditHospitalPage } from './components/EditHospitalPage';
import { signUpUser } from './utils/api';

type Page = 'landing' | 'login' | 'signup' | 'patient-dashboard' | 'doctor-dashboard' | 'admin-dashboard' | 'upload-report' | 'view-report' |
           'emergency-services' | 'medicine-scanner' | 'health-assistant' | 'home-services' | 'hospital-finder' |
           'appointment-booking' | 'community-support' | 'cost-estimator' | 'pickup-service' |
           'emergency-response' | 'medicine-verification' | 'report-analysis' | 'appointment-management' |
           'patient-monitoring' | 'telehealth-consultation' | 'hospital-details';
type UserType = 'patient' | 'doctor' | 'admin' | null;

const pageToPath: Record<Page, string> = {
  'landing': '/',
  'login': '/login',
  'signup': '/signup',
  'patient-dashboard': '/patient-dashboard',
  'doctor-dashboard': '/doctor-dashboard',
  'admin-dashboard': '/admin-dashboard',
  'upload-report': '/upload-report',
  'view-report': '/view-report',
  'emergency-services': '/emergency-services',
  'medicine-scanner': '/medicine-scanner',
  'health-assistant': '/health-assistant',
  'home-services': '/home-services',
  'hospital-finder': '/hospital-finder',
  'appointment-booking': '/appointment-booking',
  'community-support': '/community-support',
  'cost-estimator': '/cost-estimator',
  'pickup-service': '/pickup-service',
  'emergency-response': '/emergency-response',
  'medicine-verification': '/medicine-verification',
  'report-analysis': '/report-analysis',
  'appointment-management': '/appointment-management',
  'patient-monitoring': '/patient-monitoring',
  'telehealth-consultation': '/telehealth-consultation',
  'hospital-details': '/hospital-details',
};

export default function App() {
  const navigateHook = useNavigate();
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const navigate = (page: Page | string, data?: any) => {
    const path = typeof page === 'string' && page.startsWith('/') ? page : pageToPath[page as Page];
    if (data) {
      setSelectedReport(data);
    }
    navigateHook(path, { state: data });
  };

  const login = (type: UserType) => {
    setUserType(type);
    if (type === 'patient') navigate('patient-dashboard');
    else if (type === 'doctor') navigate('doctor-dashboard');
    else if (type === 'admin') navigate('admin-dashboard');
  };

  const signUp = async (userData: any, type: UserType) => {
    try {
      // Merge userType into userData before sending
      const payload = { ...userData, userType: type };
      const response = await signUpUser(payload);
      console.log('User signed up successfully:', response);
      setUserType(type);
      if (type === 'patient') navigate('patient-dashboard');
      else if (type === 'doctor') navigate('doctor-dashboard');
      else if (type === 'admin') navigate('admin-dashboard');
    } catch (error: any) {
      console.error('Signup failed:', error);
      // You could show an error message to the user here
      alert('Signup failed: ' + (error.message || 'Please try again'));
    }
  };

  const logout = () => {
    setUserType(null);
    navigate('/');
  };

  // Direct login function for development/testing purposes
  const directLogin = (type: UserType) => {
    if (type === 'patient' || type === 'doctor' || type === 'admin') {
      login(type);
    }
  };

  // Expose directLogin to window for easy access in browser console
  if (typeof window !== 'undefined') {
    (window as any).directLogin = directLogin;
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<LandingPage onNavigate={navigate} />} />
        <Route path="/login" element={<LoginPage onLogin={login} onNavigate={navigate} />} />
        <Route path="/signup" element={<SignUpPage onNavigate={navigate} onSignUp={signUp} />} />
        <Route path="/patient-dashboard" element={<PatientDashboard onNavigate={navigate} onLogout={logout} />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard onNavigate={navigate} onLogout={logout} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard onNavigate={navigate} onLogout={logout} />} />
        <Route path="/upload-report" element={<ReportUpload onNavigate={navigate} userType={userType} />} />
        <Route path="/view-report" element={<ReportViewer report={selectedReport} onNavigate={navigate} userType={userType} />} />
        <Route path="/emergency-services" element={<EmergencyServices onNavigate={navigate} userType={userType} />} />
        <Route path="/medicine-scanner" element={<MedicineScanner onNavigate={navigate} userType={userType} />} />
        <Route path="/health-assistant" element={<HealthAssistant onNavigate={navigate} userType={userType} />} />
        <Route path="/home-services" element={<HomeServices onNavigate={navigate} userType={userType} />} />
        <Route path="/hospital-finder" element={<HospitalFinder onNavigate={navigate} userType={userType} />} />
        <Route path="/appointment-booking" element={<AppointmentBooking onNavigate={navigate} userType={userType} />} />
        <Route path="/community-support" element={<CommunitySupport onNavigate={navigate} userType={userType} />} />
        <Route path="/cost-estimator" element={<CostEstimator onNavigate={navigate} userType={userType} />} />
        <Route path="/pickup-service" element={<PickupService onNavigate={navigate} userType={userType} />} />
        <Route path="/emergency-response" element={<EmergencyResponse onNavigate={navigate} userType={userType} />} />
        <Route path="/medicine-verification" element={<MedicineVerification onNavigate={navigate} userType={userType} />} />
        <Route path="/report-analysis" element={<ReportAnalysis onNavigate={navigate} userType={userType} />} />
        <Route path="/appointment-management" element={<AppointmentManagement onNavigate={navigate} userType={userType} />} />
        <Route path="/patient-monitoring" element={<PatientMonitoring onNavigate={navigate} userType={userType} />} />
        <Route path="/telehealth-consultation" element={<TelehealthConsultation onNavigate={navigate} userType={userType} />} />
        <Route path="/hospital-details" element={<HospitalDetails />} />
        <Route path="/add-hospital" element={<AddHospitalPage />} />
        <Route path="/edit-hospital/:id" element={<EditHospitalPage />} />
      </Routes>
    </div>
  );
}
