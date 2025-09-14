import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
// import { Sidebar } from './Sidebar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  FileText,
  Upload,
  Calendar,
  Clock,
  Eye,
  Download,
  Plus,
  AlertTriangle,
  Scan,
  Bot,
  MapPin,
  User,
  Mail,
  Phone,
  Shield,
  Heart,
  Stethoscope,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Activity,
  Edit
} from 'lucide-react';
import { fetchPatientReports, fetchAppointments, updateProfile, fetchProfile } from '../utils/api';
import { LayoutWithSidebar } from './LayoutWithSidebar';

interface PatientDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

const ProfileDetail = ({ label, value, isBoolean = false }: { label: string; value?: string | boolean | null; isBoolean?: boolean }) => {
  if (isBoolean) {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <span className="text-sm text-gray-800">{label}</span>
      </div>
    )
  }
  return (
    <p className="text-sm">
      <strong className="font-medium text-gray-900">{label}:</strong>{' '}
      {value || <span className="text-gray-500 italic">Not provided</span>}
    </p>
  );
};

export function PatientDashboard({ onNavigate, onLogout }: PatientDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [reports, setReports] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Profile state
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',

    // Medical Information
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    currentMedications: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    preferredHospital: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',

    // Preferences
    allowEmergencyServices: false,
    allowAIAnalysis: false,
    allowDataSharing: false,
    enableLocationServices: false,
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const totalSteps = 3; // Personal Info, Medical Info, Preferences

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        // Get logged-in patient ID from localStorage
        const patientId = localStorage.getItem('userId');
        if (!patientId) {
          throw new Error("You are not logged in.");
        }
        const [reportsData, appointmentsData, profile] = await Promise.all([
          fetchPatientReports(patientId),
          fetchAppointments(patientId, 'patient'),
          fetchProfile(patientId)
        ]);
        setReports(reportsData);
        setAppointments(appointmentsData);
        if (profile) setProfileData(prev => ({ ...prev, ...profile }));

      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Reload profile data when navigating to profile section
  useEffect(() => {
    const loadProfileData = async () => {
      if (activeSection === 'profile') {
        setProfileLoading(true);
        setProfileError('');
        try {
          const patientId = localStorage.getItem('userId');
          const authToken = localStorage.getItem('authToken');

          console.log('Loading profile data:', { patientId, authToken: authToken ? 'present' : 'missing' });

          if (!patientId) {
            throw new Error("You are not logged in.");
          }
          if (!authToken) {
            throw new Error("Authentication token missing. Please log in again.");
          }

          const profile = await fetchProfile(patientId);
          console.log('Profile data received:', profile);

          if (profile) setProfileData(prev => ({ ...prev, ...profile }));
        } catch (err: any) {
          console.error('Profile fetch error:', err);
          setProfileError(err.message || 'Failed to load profile data');
        } finally {
          setProfileLoading(false);
        }
      }
    };
    loadProfileData();
  }, [activeSection]);

  const updateProfileData = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProfileSubmit = async () => {
    setProfileLoading(true);
    setProfileError('');
    setProfileSuccess('');
    try {
      const patientId = localStorage.getItem('userId');
      if (!patientId) {
        throw new Error("You are not logged in.");
      }
      await updateProfile(patientId, profileData);
      setProfileSuccess('Profile updated successfully.');
      setIsEditing(false);
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-black text-black mb-2">
          {loading ? (
            <span className="h-8 bg-gray-200 rounded w-1/2 inline-block animate-pulse"></span>
          ) : (
            `Welcome back, ${profileData.fullName || 'Patient'}!`
          )}
        </h1>
        <p className="text-base text-gray-600">Here's an overview of your health dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Total Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">{reports.length}</div>
            <p className="text-sm text-gray-500">Medical documents</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">{appointments.length}</div>
            <p className="text-sm text-gray-500">Upcoming visits</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Last Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">3d</div>
            <p className="text-sm text-gray-500">Days ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-black">Quick Actions</CardTitle>
          <CardDescription>Access key features quickly</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button 
            className="w-full bg-black hover:bg-gray-800 text-white rounded-xl font-semibold"
            onClick={() => onNavigate('upload-report')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
          </Button>
          <Button 
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
            onClick={() => onNavigate('emergency-services')}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency SOS
          </Button>
          <Button 
            variant="outline"
            className="w-full rounded-xl font-semibold border-gray-300"
            onClick={() => onNavigate('medicine-scanner')}
          >
            <Scan className="w-4 h-4 mr-2" />
            Scan Medicine
          </Button>
          <Button 
            variant="outline"
            className="w-full rounded-xl font-semibold border-gray-300"
            onClick={() => onNavigate('health-assistant')}
          >
            <Bot className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
          <Button 
            variant="outline"
            className="w-full rounded-xl font-semibold border-gray-300"
            onClick={() => onNavigate('appointment-booking')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
          <Button 
            variant="outline"
            className="w-full rounded-xl font-semibold border-gray-300"
            onClick={() => onNavigate('hospital-finder')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find Hospitals
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="border-gray-200 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-black">Recent Reports</CardTitle>
          <CardDescription>Your latest medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.type}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.doctor}</TableCell>
                    <TableCell>
                      <Badge 
                        className={report.status === 'Reviewed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-xs px-2 py-1"
                          onClick={() => onNavigate('view-report', report)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-xs px-2 py-1"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl text-gray-900">Personal Information</h2>
        <p className="text-gray-600">Update your personal details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={profileData.fullName}
            onChange={(e) => updateProfileData('fullName', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={profileData.email}
            onChange={(e) => updateProfileData('email', e.target.value)}
            className="rounded-xl"
            disabled
          />
          <p className="text-xs text-gray-500">Email cannot be changed</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={profileData.phone}
            onChange={(e) => updateProfileData('phone', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => updateProfileData('dateOfBirth', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={profileData.gender} onValueChange={(value) => updateProfileData('gender', value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </Label>
          <Input
            id="address"
            placeholder="Street address"
            value={profileData.address}
            onChange={(e) => updateProfileData('address', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            value={profileData.city}
            onChange={(e) => updateProfileData('city', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="State"
              value={profileData.state}
              onChange={(e) => updateProfileData('state', e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              placeholder="12345"
              value={profileData.zipCode}
              onChange={(e) => updateProfileData('zipCode', e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl text-gray-900">Medical Information</h2>
        <p className="text-gray-600">Update your medical details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Emergency Contact Information */}
        <div className="md:col-span-2">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Emergency Contact Information
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName" className="flex items-center gap-1">
                Contact Name
              </Label>
              <Input
                id="emergencyContactName"
                placeholder="Full name"
                value={profileData.emergencyContactName}
                onChange={(e) => updateProfileData('emergencyContactName', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone" className="flex items-center gap-1">
                Contact Phone
              </Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={profileData.emergencyContactPhone}
                onChange={(e) => updateProfileData('emergencyContactPhone', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelation">Relationship</Label>
              <Select value={profileData.emergencyContactRelation} onValueChange={(value) => updateProfileData('emergencyContactRelation', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Optional Fields */}
        <div className="space-y-2">
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select value={profileData.bloodType} onValueChange={(value) => updateProfileData('bloodType', value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a+">A+</SelectItem>
              <SelectItem value="a-">A-</SelectItem>
              <SelectItem value="b+">B+</SelectItem>
              <SelectItem value="b-">B-</SelectItem>
              <SelectItem value="ab+">AB+</SelectItem>
              <SelectItem value="ab-">AB-</SelectItem>
              <SelectItem value="o+">O+</SelectItem>
              <SelectItem value="o-">O-</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredHospital">Preferred Hospital</Label>
          <Input
            id="preferredHospital"
            placeholder="Enter hospital name"
            value={profileData.preferredHospital}
            onChange={(e) => updateProfileData('preferredHospital', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            placeholder="List any known allergies (medications, food, environmental, etc.)"
            value={profileData.allergies}
            onChange={(e) => updateProfileData('allergies', e.target.value)}
            className="rounded-xl"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="medicalConditions">Current Medical Conditions</Label>
          <Textarea
            id="medicalConditions"
            placeholder="List any current medical conditions or chronic illnesses"
            value={profileData.medicalConditions}
            onChange={(e) => updateProfileData('medicalConditions', e.target.value)}
            className="rounded-xl"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="currentMedications">Current Medications</Label>
          <Textarea
            id="currentMedications"
            placeholder="List current medications and dosages"
            value={profileData.currentMedications}
            onChange={(e) => updateProfileData('currentMedications', e.target.value)}
            className="rounded-xl"
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl mb-4">Insurance Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                placeholder="e.g., Blue Cross Blue Shield"
                value={profileData.insuranceProvider}
                onChange={(e) => updateProfileData('insuranceProvider', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
              <Input
                id="insurancePolicyNumber"
                placeholder="Policy number"
                value={profileData.insurancePolicyNumber}
                onChange={(e) => updateProfileData('insurancePolicyNumber', e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl text-gray-900">Preferences & Settings</h2>
        <p className="text-gray-600">Configure your account preferences</p>
      </div>

      <div className="space-y-8">
        {/* Feature Permissions */}
        <div className="space-y-4">
          <h3 className="text-xl">Feature Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="allowEmergencyServices"
                checked={profileData.allowEmergencyServices}
                onCheckedChange={(checked) => updateProfileData('allowEmergencyServices', checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="allowEmergencyServices" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Enable Emergency Services
                </Label>
                <p className="text-sm text-gray-500">
                  Allow emergency SOS, location sharing, and priority alerts
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="allowAIAnalysis"
                checked={profileData.allowAIAnalysis}
                onCheckedChange={(checked) => updateProfileData('allowAIAnalysis', checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="allowAIAnalysis" className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-500" />
                  Enable AI Health Analysis
                </Label>
                <p className="text-sm text-gray-500">
                  Allow AI to analyze your health data and provide insights
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="enableLocationServices"
                checked={profileData.enableLocationServices}
                onCheckedChange={(checked) => updateProfileData('enableLocationServices', checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="enableLocationServices" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Enable Location Services
                </Label>
                <p className="text-sm text-gray-500">
                  For hospital finder, emergency services, and pickup services
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="allowDataSharing"
                checked={profileData.allowDataSharing}
                onCheckedChange={(checked) => updateProfileData('allowDataSharing', checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="allowDataSharing" className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Allow Secure Data Sharing
                </Label>
                <p className="text-sm text-gray-500">
                  Share anonymized data to improve healthcare services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 max-w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-gray-900">Profile Settings</h1>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {profileError && <p className="text-red-600 bg-red-50 p-3 rounded-xl">{profileError}</p>}
      {profileSuccess && <p className="text-green-600 bg-green-50 p-3 rounded-xl">{profileSuccess}</p>}

      {!isEditing ? (
        // View Mode
        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle>Your Profile Information</CardTitle>
            <CardDescription>Review your current profile details</CardDescription>
          </CardHeader>
          <CardContent>
            {profileLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mt-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : profileError ? (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                <p><strong>Error:</strong> Could not load profile data.</p>
                <p className="text-sm">{profileError}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Profile Header Card */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName || 'Patient'}</h2>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {profileData.email}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {profileData.phone || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information Card */}
                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="w-5 h-5 text-blue-500" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                            <p className="text-gray-900">{profileData.dateOfBirth || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Gender</p>
                            <p className="text-gray-900 capitalize">{profileData.gender || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Address</p>
                            <p className="text-gray-900">
                              {profileData.address ? `${profileData.address}, ` : ''}
                              {profileData.city ? `${profileData.city}, ` : ''}
                              {profileData.state ? `${profileData.state} ` : ''}
                              {profileData.zipCode || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Information Card */}
                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Heart className="w-5 h-5 text-red-500" />
                      Medical Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <Heart className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Blood Type</p>
                            <p className="text-gray-900 font-semibold">{profileData.bloodType || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Preferred Hospital</p>
                            <p className="text-gray-900">{profileData.preferredHospital || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                            <p className="text-gray-900">{profileData.emergencyContactName || 'Not provided'}</p>
                            <p className="text-sm text-gray-600">{profileData.emergencyContactPhone || ''}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <Shield className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Insurance</p>
                            <p className="text-gray-900">{profileData.insuranceProvider || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Details */}
                    {(profileData.allergies || profileData.medicalConditions || profileData.currentMedications) && (
                      <div className="mt-6 space-y-4">
                        {profileData.allergies && (
                          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                            <h4 className="font-medium text-yellow-800 mb-2">Allergies</h4>
                            <p className="text-yellow-700">{profileData.allergies}</p>
                          </div>
                        )}
                        {profileData.medicalConditions && (
                          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                            <h4 className="font-medium text-red-800 mb-2">Medical Conditions</h4>
                            <p className="text-red-700">{profileData.medicalConditions}</p>
                          </div>
                        )}
                        {profileData.currentMedications && (
                          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <h4 className="font-medium text-blue-800 mb-2">Current Medications</h4>
                            <p className="text-blue-700">{profileData.currentMedications}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Preferences Card */}
                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Shield className="w-5 h-5 text-purple-500" />
                      Preferences & Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className={`w-5 h-5 ${profileData.allowEmergencyServices ? 'text-red-500' : 'text-gray-400'}`} />
                          <span className="font-medium">Emergency Services</span>
                        </div>
                        <Badge variant={profileData.allowEmergencyServices ? "default" : "secondary"} className={profileData.allowEmergencyServices ? "bg-red-500" : ""}>
                          {profileData.allowEmergencyServices ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bot className={`w-5 h-5 ${profileData.allowAIAnalysis ? 'text-purple-500' : 'text-gray-400'}`} />
                          <span className="font-medium">AI Analysis</span>
                        </div>
                        <Badge variant={profileData.allowAIAnalysis ? "default" : "secondary"} className={profileData.allowAIAnalysis ? "bg-purple-500" : ""}>
                          {profileData.allowAIAnalysis ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className={`w-5 h-5 ${profileData.enableLocationServices ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span className="font-medium">Location Services</span>
                        </div>
                        <Badge variant={profileData.enableLocationServices ? "default" : "secondary"} className={profileData.enableLocationServices ? "bg-blue-500" : ""}>
                          {profileData.enableLocationServices ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className={`w-5 h-5 ${profileData.allowDataSharing ? 'text-green-500' : 'text-gray-400'}`} />
                          <span className="font-medium">Data Sharing</span>
                        </div>
                        <Badge variant={profileData.allowDataSharing ? "default" : "secondary"} className={profileData.allowDataSharing ? "bg-green-500" : ""}>
                          {profileData.allowDataSharing ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        // Edit Mode - Multi-step form
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        currentStep > i + 1
                          ? 'bg-gray-600 text-white'
                          : currentStep === i + 1
                          ? 'bg-black text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`w-12 h-1 ${currentStep > i + 1 ? 'bg-gray-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>
              <Badge variant="outline" className="px-3 py-1">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
          </div>

          {/* Step Content */}
          <Card className="border-0 shadow-2xl rounded-3xl">
            <CardContent className="p-8 md:p-12">
              {currentStep === 1 && renderPersonalInfo()}
              {currentStep === 2 && renderMedicalInfo()}
              {currentStep === 3 && renderPreferences()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <Button
                  variant="outline"
                  onClick={currentStep === 1 ? () => setIsEditing(false) : prevStep}
                  className="rounded-xl px-6 border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentStep === 1 ? 'Cancel' : 'Previous'}
                </Button>

                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleProfileSubmit}
                    disabled={profileLoading}
                    className="bg-black hover:bg-gray-800 text-white rounded-xl px-8"
                  >
                    {profileLoading ? 'Saving...' : 'Save Changes'}
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="bg-black hover:bg-gray-800 text-white rounded-xl px-6"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-gray-900">Medical Reports</h1>
      <Card className="border-0 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>View and manage your medical reports</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading reports...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.doctor}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-xs px-2 py-1"
                          onClick={() => onNavigate('view-report', report)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-xs px-2 py-1"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    try {
      switch (activeSection) {
        case 'dashboard':
          return renderDashboard();
        case 'reports':
          return renderReports();
        case 'profile':
          return renderProfile();
        default:
          return renderDashboard();
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return renderDashboard(); // Fallback to dashboard
    }
  };

  return (
    <LayoutWithSidebar
      userType="patient"
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      {renderContent()}
    </LayoutWithSidebar>
  );
}
