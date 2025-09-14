import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Heart,
  AlertTriangle,
  Bot,
  Stethoscope,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Activity,
  Users,
  Building2,
  BarChart3
} from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
  onSignUp: (userData: any, userType: 'patient' | 'doctor' | 'admin') => void;
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [formData, setFormData] = useState({
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
    
    // Healthcare Professional Information (for doctors)
    licenseNumber: '',
    specialization: '',
    medicalDegree: '',
    yearsOfExperience: '',
    hospitalAffiliation: '',
    
    // Security & Preferences
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    allowEmergencyServices: false,
    allowAIAnalysis: false,
    allowDataSharing: false,
    enableLocationServices: false,
    notificationPreferences: {
      email: true,
      sms: true,
      push: true,
      emergency: true
    }
  });

  const totalSteps = userType === 'patient' ? 4 : 4; // Patients: 4 steps, Doctors: 4 steps

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (parentField: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof typeof prev],
        [field]: value
      }
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

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    // Validate required fields based on user type
    const baseRequiredFields = ['fullName', 'email', 'phone', 'password'];
    const patientRequiredFields = ['emergencyContactName', 'emergencyContactPhone'];
    const doctorRequiredFields = ['licenseNumber', 'specialization'];

    let requiredFields = [...baseRequiredFields];

    if (userType === 'patient') {
      requiredFields = [...requiredFields, ...patientRequiredFields];
    } else {
      requiredFields = [...requiredFields, ...doctorRequiredFields];
    }

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => {
        switch(field) {
          case 'fullName': return 'Full Name';
          case 'email': return 'Email';
          case 'phone': return 'Phone';
          case 'password': return 'Password';
          case 'emergencyContactName': return 'Emergency Contact Name';
          case 'emergencyContactPhone': return 'Emergency Contact Phone';
          case 'licenseNumber': return 'Medical License Number';
          case 'specialization': return 'Specialization';
          default: return field;
        }
      });
      setError(`Please fill in all required fields: ${fieldNames.join(', ')}`);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToPrivacy) {
      setError('Please agree to the Terms and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      await onSignUp(formData, userType);
      // After successful signup, navigate to login page
      onNavigate('login');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-black">Join Heal Nexus</h1>
        <p className="text-xl text-gray-500">Choose your account type to get started</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card
          className={`cursor-pointer transition-all duration-300 rounded-2xl ${
            userType === 'patient'
              ? 'bg-black text-white shadow-2xl border-black'
              : 'border-gray-200 hover:shadow-lg text-gray-900'
          }`}
          onClick={() => setUserType('patient')}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <User className="w-10 h-10 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Patient Account</CardTitle>
            <CardDescription className="text-lg">
              Access comprehensive healthcare services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Emergency SOS Services</span>
              </div>
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-purple-500" />
                <span>AI Health Assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Home Healthcare Services</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>Appointment Booking</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-300 rounded-2xl ${
            userType === 'doctor'
              ? 'bg-black text-white shadow-2xl border-black'
              : 'border-gray-200 hover:shadow-lg text-gray-900'
          }`}
          onClick={() => setUserType('doctor')}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <Stethoscope className="w-10 h-10 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Healthcare Professional</CardTitle>
            <CardDescription className="text-lg">
              Manage patients and provide care
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Verified Professional Status</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-500" />
                <span>Patient Management System</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-teal-500" />
                <span>Medical Report Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span>Appointment Management</span>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Removed Admin Account card to disable admin sign-up */}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-black">Personal Information</h2>
        <p className="text-gray-500">Help us get to know you better</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)} >
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
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              className="rounded-xl focus:border-black focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              placeholder="12345"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              className="rounded-xl focus:border-black focus:ring-black"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="md:col-span-2 pt-6 border-t border-gray-200">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Security
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter secure password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="rounded-xl focus:border-black focus:ring-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className="rounded-xl focus:border-black focus:ring-black"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-black">Medical Information</h2>
        <p className="text-gray-500">This helps us provide better healthcare services</p>
        <p className="text-sm text-gray-500">* Required fields must be completed to create account</p>
      </div>

      {/* Skip Option */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-blue-900">Optional Information</h3>
            <p className="text-sm text-blue-700">You can skip detailed medical information and add it later in your profile</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="border-gray-300 text-black hover:bg-gray-100"
          >
            Skip for Now
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mandatory Fields */}
        <div className="md:col-span-2">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Emergency Contact Information (Required)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName" className="flex items-center gap-1">
                Contact Name *
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emergencyContactName"
                placeholder="Full name"
                value={formData.emergencyContactName}
                onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                className="rounded-xl focus:border-black focus:ring-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone" className="flex items-center gap-1">
                Contact Phone *
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.emergencyContactPhone}
                onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
                className="rounded-xl focus:border-black focus:ring-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelation">Relationship</Label>
              <Select value={formData.emergencyContactRelation} onValueChange={(value) => updateFormData('emergencyContactRelation', value)}>
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
          <Label htmlFor="bloodType">Blood Type (Optional)</Label>
          <Select value={formData.bloodType} onValueChange={(value) => updateFormData('bloodType', value)}>
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
          <Label htmlFor="preferredHospital">Preferred Hospital (Optional)</Label>
          <Input
            id="preferredHospital"
            placeholder="Enter hospital name"
            value={formData.preferredHospital}
            onChange={(e) => updateFormData('preferredHospital', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="allergies">Allergies (Optional)</Label>
          <Textarea
            id="allergies"
            placeholder="List any known allergies (medications, food, environmental, etc.)"
            value={formData.allergies}
            onChange={(e) => updateFormData('allergies', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="medicalConditions">Current Medical Conditions (Optional)</Label>
          <Textarea
            id="medicalConditions"
            placeholder="List any current medical conditions or chronic illnesses"
            value={formData.medicalConditions}
            onChange={(e) => updateFormData('medicalConditions', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="currentMedications">Current Medications (Optional)</Label>
          <Textarea
            id="currentMedications"
            placeholder="List current medications and dosages"
            value={formData.currentMedications}
            onChange={(e) => updateFormData('currentMedications', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl mb-4">Insurance Information (Optional)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                placeholder="e.g., Blue Cross Blue Shield"
                value={formData.insuranceProvider}
                onChange={(e) => updateFormData('insuranceProvider', e.target.value)}
                className="rounded-xl focus:border-black focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
              <Input
                id="insurancePolicyNumber"
                placeholder="Policy number"
                value={formData.insurancePolicyNumber}
                onChange={(e) => updateFormData('insurancePolicyNumber', e.target.value)}
                className="rounded-xl focus:border-black focus:ring-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-black">Professional Information</h2>
        <p className="text-gray-500">Verify your medical credentials</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="licenseNumber">Medical License Number *</Label>
          <Input
            id="licenseNumber"
            placeholder="Enter your license number"
            value={formData.licenseNumber}
            onChange={(e) => updateFormData('licenseNumber', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization *</Label>
          <Select value={formData.specialization} onValueChange={(value) => updateFormData('specialization', value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="emergency-medicine">Emergency Medicine</SelectItem>
              <SelectItem value="family-medicine">Family Medicine</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="psychiatry">Psychiatry</SelectItem>
              <SelectItem value="radiology">Radiology</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalDegree">Medical Degree</Label>
          <Input
            id="medicalDegree"
            placeholder="e.g., MD, DO, MBBS"
            value={formData.medicalDegree}
            onChange={(e) => updateFormData('medicalDegree', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Select value={formData.yearsOfExperience} onValueChange={(value) => updateFormData('yearsOfExperience', value)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11-15">11-15 years</SelectItem>
              <SelectItem value="16-20">16-20 years</SelectItem>
              <SelectItem value="20+">20+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="hospitalAffiliation">Hospital Affiliation</Label>
          <Input
            id="hospitalAffiliation"
            placeholder="Current hospital or clinic affiliation"
            value={formData.hospitalAffiliation}
            onChange={(e) => updateFormData('hospitalAffiliation', e.target.value)}
            className="rounded-xl focus:border-black focus:ring-black"
          />
        </div>
      </div>
    </div>
  );

  const renderSecurityAndPreferences = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-black">Security & Preferences</h2>
        <p className="text-gray-500">Set up your account security and feature preferences</p>
      </div>

      <div className="space-y-8">
        {/* Feature Permissions */}
        <div className="space-y-4">
          <h3 className="text-xl">Feature Permissions</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="allowEmergencyServices"
                checked={formData.allowEmergencyServices}
                onCheckedChange={(checked) => updateFormData('allowEmergencyServices', checked)}
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
                checked={formData.allowAIAnalysis}
                onCheckedChange={(checked) => updateFormData('allowAIAnalysis', checked)}
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
                checked={formData.enableLocationServices}
                onCheckedChange={(checked) => updateFormData('enableLocationServices', checked)}
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
                checked={formData.allowDataSharing}
                onCheckedChange={(checked) => updateFormData('allowDataSharing', checked)}
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

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="text-xl">Notification Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="emailNotifications"
                checked={formData.notificationPreferences.email}
                onCheckedChange={(checked) => updateNestedFormData('notificationPreferences', 'email', checked)}
              />
              <Label htmlFor="emailNotifications">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="smsNotifications"
                checked={formData.notificationPreferences.sms}
                onCheckedChange={(checked) => updateNestedFormData('notificationPreferences', 'sms', checked)}
              />
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="pushNotifications"
                checked={formData.notificationPreferences.push}
                onCheckedChange={(checked) => updateNestedFormData('notificationPreferences', 'push', checked)}
              />
              <Label htmlFor="pushNotifications">Push Notifications</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="emergencyNotifications"
                checked={formData.notificationPreferences.emergency}
                onCheckedChange={(checked) => updateNestedFormData('notificationPreferences', 'emergency', checked)}
              />
              <Label htmlFor="emergencyNotifications">Emergency Alerts</Label>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <h3 className="text-xl">Terms & Conditions</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateFormData('agreeToTerms', checked)}
                required
              />
              <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                I agree to the <span className="text-black underline cursor-pointer font-bold">Terms of Service</span> *
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="agreeToPrivacy"
                checked={formData.agreeToPrivacy}
                onCheckedChange={(checked) => updateFormData('agreeToPrivacy', checked)}
                required
              />
              <Label htmlFor="agreeToPrivacy" className="text-sm font-medium">
                I agree to the <span className="text-black underline cursor-pointer font-bold">Privacy Policy</span> *
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (currentStep === 1) return renderUserTypeSelection();
    if (currentStep === 2) return renderPersonalInfo();
    if (currentStep === 3) {
      if (userType === 'doctor') {
        return renderProfessionalInfo();
      } else {
        return renderMedicalInfo();
      }
    }
    if (currentStep === 4) {
      return renderSecurityAndPreferences();
    }
    return renderSecurityAndPreferences();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-black text-black">Heal Nexus</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => onNavigate('landing')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl rounded-3xl">
          <CardContent className="p-8 md:p-12">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="rounded-xl px-6 border-gray-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-black hover:bg-gray-800 text-white rounded-xl px-8"
                >
                  Create Account
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
    </div>
  );
}