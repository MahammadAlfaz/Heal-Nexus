import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import {
  User,
  HeartPulse,
  Shield,
  FileText,
  Lock,
  Edit,
  Phone,
  Cake,
  Droplets,
  TriangleAlert,
  Pill,
  ShieldAlert,
  Hospital,
  ToggleLeft,
  ToggleRight,
  Loader2
} from 'lucide-react';
import { fetchPatientProfile } from '../utils/api';

// Define the patient data structure based on backend User model
interface PatientProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  currentMedications?: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  preferredHospital?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  allowEmergencyServices?: boolean;
  allowAIAnalysis?: boolean;
  allowDataSharing?: boolean;
  enableLocationServices?: boolean;
  photoUrl?: string;
}

export function PatientProfile() {
  const [patient, setPatient] = useState<PatientProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchPatientProfile(userId);
        setPatient(data);
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const getInitials = (name: string = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const calculateAge = (dob?: string) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!patient) {
    return <div className="text-center">No profile data found.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarImage src={patient.photoUrl} alt={patient.fullName} />
              <AvatarFallback className="text-3xl">{getInitials(patient.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{patient.fullName}</h1>
              <p className="text-gray-600">{patient.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {patient.phone || 'N/A'}</div>
                <div className="flex items-center gap-1.5"><Cake className="w-4 h-4" /> Age: {calculateAge(patient.dateOfBirth)}</div>
                <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> {patient.gender || 'N/A'}</div>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-0 shadow-lg rounded-xl">
            <CardHeader><CardTitle className="flex items-center gap-2"><HeartPulse className="w-5 h-5 text-primary" /> Medical Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Droplets className="w-5 h-5 text-red-500" /><p><span className="text-gray-500">Blood Type:</span> <span className="font-medium text-gray-800">{patient.bloodType || 'N/A'}</span></p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3"><h4 className="font-medium text-gray-800 flex items-center gap-2"><TriangleAlert className="w-4 h-4 text-yellow-600" /> Allergies</h4>{patient.allergies?.length ? <div className="flex flex-wrap gap-2">{patient.allergies.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}</div> : <p className="text-sm text-gray-500">No known allergies.</p>}</div>
              <Separator />
              <div className="space-y-3"><h4 className="font-medium text-gray-800 flex items-center gap-2"><Pill className="w-4 h-4 text-blue-600" /> Current Medications</h4>{patient.currentMedications?.length ? <div className="flex flex-wrap gap-2">{patient.currentMedications.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}</div> : <p className="text-sm text-gray-500">No current medications.</p>}</div>
              <Separator />
              <div className="space-y-3"><h4 className="font-medium text-gray-800 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-red-600" /> Medical Conditions</h4>{patient.medicalConditions?.length ? <div className="flex flex-wrap gap-2">{patient.medicalConditions.map(item => <Badge key={item} variant="destructive">{item}</Badge>)}</div> : <p className="text-sm text-gray-500">No pre-existing conditions.</p>}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-lg rounded-xl"><CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-red-600" /> Emergency Contact</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p className="font-medium text-gray-800">{patient.emergencyContactName || 'N/A'}</p><p className="text-gray-500">{patient.emergencyContactRelation || 'N/A'}</p><p className="text-gray-500 flex items-center gap-2"><Phone className="w-3 h-3" /> {patient.emergencyContactPhone || 'N/A'}</p></CardContent></Card>
          <Card className="border-0 shadow-lg rounded-xl"><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-green-600" /> Insurance</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div><p className="text-gray-500">Provider</p><p className="font-medium text-gray-800">{patient.insuranceProvider || 'N/A'}</p></div><div><p className="text-gray-500">Policy No.</p><p className="font-medium text-gray-800">{patient.insurancePolicyNumber || 'N/A'}</p></div><Separator /><div><p className="text-gray-500">Preferred Hospital</p><p className="font-medium text-gray-800 flex items-center gap-2"><Hospital className="w-4 h-4" /> {patient.preferredHospital || 'N/A'}</p></div></CardContent></Card>
          <Card className="border-0 shadow-lg rounded-xl"><CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-gray-600" /> Privacy Settings</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div className="flex justify-between items-center"><span className="text-gray-600">Location Services</span>{patient.enableLocationServices ? <ToggleRight className="w-10 h-5 text-primary" /> : <ToggleLeft className="w-10 h-5 text-gray-400" />}</div><div className="flex justify-between items-center"><span className="text-gray-600">Emergency Access</span>{patient.allowEmergencyServices ? <ToggleRight className="w-10 h-5 text-primary" /> : <ToggleLeft className="w-10 h-5 text-gray-400" />}</div><div className="flex justify-between items-center"><span className="text-gray-600">AI Analysis</span>{patient.allowAIAnalysis ? <ToggleRight className="w-10 h-5 text-primary" /> : <ToggleLeft className="w-10 h-5 text-gray-400" />}</div><div className="flex justify-between items-center"><span className="text-gray-600">Data Sharing</span>{patient.allowDataSharing ? <ToggleRight className="w-10 h-5 text-primary" /> : <ToggleLeft className="w-10 h-5 text-gray-400" />}</div></CardContent></Card>
        </div>
      </div>
    </div>
  );
}