import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
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
  Loader2,
  Mail,
  MapPin,
  Activity,
  Ruler,
  Weight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { EditPatientProfile } from './EditPatientProfile';

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

interface PatientProfileProps {
  patient: PatientProfileData | null;
  onProfileUpdate: () => void;
}

export function PatientProfile({ patient, onProfileUpdate }: PatientProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveSuccess = () => {
    setIsEditing(false);
    onProfileUpdate();
  };
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

  if (!patient || !patient.id) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (!patient) {
    return <div className="text-center">No profile data found.</div>;
  }

  if (isEditing && patient) {
    return (
      <EditPatientProfile
        initialData={patient}
        onSaveSuccess={handleSaveSuccess}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number | undefined }) => (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <p className="font-medium text-gray-900">{value || 'N/A'}</p>
    </div>
  );

  const PrivacyToggle = ({ label, enabled }: { label: string, enabled?: boolean }) => (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <Badge variant={enabled ? 'default' : 'outline'}>{enabled ? 'Enabled' : 'Disabled'}</Badge>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarImage src={patient.photoUrl} alt={patient.fullName} />
              <AvatarFallback className="text-3xl">{getInitials(patient.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{patient.fullName}</h1>
              <p className="text-gray-600">{patient.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {patient.phone || 'N/A'}</div>
                <div className="flex items-center gap-1.5"><Cake className="w-4 h-4" /> Age: {calculateAge(patient.dateOfBirth)}</div>
                <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> {patient.gender || 'N/A'}</div>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl bg-white/50 backdrop-blur-sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-100 rounded-xl p-1">
          <TabsTrigger value="summary" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">Medical Summary</TabsTrigger>
          <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">Personal Details</TabsTrigger>
          <TabsTrigger value="emergency" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">Emergency & Insurance</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">Settings</TabsTrigger>
        </TabsList>

        {/* Medical Summary Tab */}
        <TabsContent value="summary" className="mt-6">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HeartPulse className="w-5 h-5 text-primary" /> Medical Summary</CardTitle>
              <CardDescription>An overview of your key health information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-red-50 p-4 rounded-lg"><p className="text-sm text-red-700">Blood Type</p><p className="font-bold text-lg text-red-900">{patient.bloodType || 'N/A'}</p></div>
                <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm text-blue-700">Height</p><p className="font-bold text-lg text-blue-900">175 cm</p></div>
                <div className="bg-green-50 p-4 rounded-lg"><p className="text-sm text-green-700">Weight</p><p className="font-bold text-lg text-green-900">70 kg</p></div>
                <div className="bg-purple-50 p-4 rounded-lg"><p className="text-sm text-purple-700">BMI</p><p className="font-bold text-lg text-purple-900">22.9</p></div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3"><TriangleAlert className="w-4 h-4 text-yellow-600" /> Allergies</h4>
                {patient.allergies && patient.allergies.length > 0 ? <div className="flex flex-wrap gap-2">{(Array.isArray(patient.allergies) ? patient.allergies : String(patient.allergies).split(',')).map(item => item.trim()).filter(Boolean).map(item => <Badge key={item} variant="secondary">{item}</Badge>)}</div> : <p className="text-sm text-gray-500">No known allergies.</p>}
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3"><ShieldAlert className="w-4 h-4 text-red-600" /> Medical Conditions</h4>
                {patient.medicalConditions && patient.medicalConditions.length > 0 ? <div className="flex flex-wrap gap-2">{(Array.isArray(patient.medicalConditions) ? patient.medicalConditions : String(patient.medicalConditions).split(',')).map(item => item.trim()).filter(Boolean).map(item => <Badge key={item} variant="destructive">{item}</Badge>)}</div> : <p className="text-sm text-gray-500">No pre-existing conditions.</p>}
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3"><Pill className="w-4 h-4 text-blue-600" /> Current Medications</h4>
                {patient.currentMedications && patient.currentMedications.length > 0 ? <div className="flex flex-wrap gap-2">{(Array.isArray(patient.currentMedications) ? patient.currentMedications : String(patient.currentMedications).split(',')).map(item => item.trim()).filter(Boolean).map(item => <Badge key={item} variant="secondary">{item}</Badge>)}</div> : <p className="text-sm text-gray-500">No current medications.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Details Tab */}
        <TabsContent value="details" className="mt-6">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Personal Details</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoItem icon={Mail} label="Email" value={patient.email} />
              <InfoItem icon={Phone} label="Phone" value={patient.phone} />
              <InfoItem icon={Cake} label="Date of Birth" value={patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'} />
              <InfoItem icon={User} label="Gender" value={patient.gender} />
              <div className="md:col-span-2">
                <InfoItem icon={MapPin} label="Address" value={`${patient.address || ''}, ${patient.city || ''}, ${patient.state || ''} - ${patient.zipCode || ''}`.replace(/, ,/g, ',').replace(/^,|,$/g, '') || 'N/A'} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency & Insurance Tab */}
        <TabsContent value="emergency" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-red-600" /> Emergency Contact</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <InfoItem icon={User} label="Name" value={patient.emergencyContactName} />
                <InfoItem icon={Phone} label="Phone" value={patient.emergencyContactPhone} />
                <InfoItem icon={HeartPulse} label="Relation" value={patient.emergencyContactRelation} />
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-green-600" /> Insurance Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <InfoItem icon={Hospital} label="Provider" value={patient.insuranceProvider} />
                <InfoItem icon={FileText} label="Policy Number" value={patient.insurancePolicyNumber} />
                <InfoItem icon={Hospital} label="Preferred Hospital" value={patient.preferredHospital} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-gray-600" /> Privacy & Data Settings</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <PrivacyToggle label="Enable Location Services" enabled={patient.enableLocationServices} />
              <PrivacyToggle label="Allow Emergency Access" enabled={patient.allowEmergencyServices} />
              <PrivacyToggle label="Allow AI Health Analysis" enabled={patient.allowAIAnalysis} />
              <PrivacyToggle label="Allow Anonymized Data Sharing" enabled={patient.allowDataSharing} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}