import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { updateProfile } from '../utils/api';
import { Loader2, User, Heart, Lock, ArrowLeft, Save, Edit, Shield } from 'lucide-react';

// This interface should match the one in PatientProfile.tsx
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
  allergies?: string[] | string; // Handle both array and string
  medicalConditions?: string[] | string;
  currentMedications?: string[] | string;
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

interface EditPatientProfileProps {
  initialData: PatientProfileData;
  onSaveSuccess: () => void;
  onCancel: () => void;
}

export function EditPatientProfile({ initialData, onSaveSuccess, onCancel }: EditPatientProfileProps) {
  const [formData, setFormData] = useState<Partial<PatientProfileData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Convert array fields to comma-separated strings for the text areas
    setFormData({
      ...initialData,
      allergies: Array.isArray(initialData.allergies) ? initialData.allergies.join(', ') : initialData.allergies || '',
      medicalConditions: Array.isArray(initialData.medicalConditions) ? initialData.medicalConditions.join(', ') : initialData.medicalConditions || '',
      currentMedications: Array.isArray(initialData.currentMedications) ? initialData.currentMedications.join(', ') : initialData.currentMedications || '',
    });
  }, [initialData]);

  const handleChange = (field: keyof PatientProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Convert string fields back to arrays for the backend
      const dataToSave = {
        ...formData,
        allergies: typeof formData.allergies === 'string' ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
        medicalConditions: typeof formData.medicalConditions === 'string' ? formData.medicalConditions.split(',').map(s => s.trim()).filter(Boolean) : [],
        currentMedications: typeof formData.currentMedications === 'string' ? formData.currentMedications.split(',').map(s => s.trim()).filter(Boolean) : [],
      };
      await updateProfile(initialData.id, dataToSave);
      onSaveSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5 text-primary" />
          Edit Your Profile
        </CardTitle>
        <CardDescription>Update your personal and medical information. Click save when you're done.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {error && <div className="text-red-500 bg-red-50 p-3 rounded-lg">{error}</div>}
        
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2"><User className="w-4 h-4" /> Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label htmlFor="fullName">Full Name</Label><Input id="fullName" value={formData.fullName || ''} onChange={e => handleChange('fullName', e.target.value)} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={formData.phone || ''} onChange={e => handleChange('phone', e.target.value)} /></div>
            <div><Label htmlFor="dateOfBirth">Date of Birth</Label><Input id="dateOfBirth" type="date" value={formData.dateOfBirth?.split('T')[0] || ''} onChange={e => handleChange('dateOfBirth', e.target.value)} /></div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value: string) => handleChange('gender', value)}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2"><Label htmlFor="address">Address</Label><Input id="address" value={formData.address || ''} onChange={e => handleChange('address', e.target.value)} /></div>
            <div><Label htmlFor="city">City</Label><Input id="city" value={formData.city || ''} onChange={e => handleChange('city', e.target.value)} /></div>
            <div><Label htmlFor="state">State</Label><Input id="state" value={formData.state || ''} onChange={e => handleChange('state', e.target.value)} /></div>
            <div><Label htmlFor="zipCode">Zip Code</Label><Input id="zipCode" value={formData.zipCode || ''} onChange={e => handleChange('zipCode', e.target.value)} /></div>
          </div>
        </div>

        {/* Medical Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2"><Heart className="w-4 h-4" /> Medical Information</h3>
          <div><Label htmlFor="bloodType">Blood Type</Label><Input id="bloodType" value={formData.bloodType || ''} onChange={e => handleChange('bloodType', e.target.value)} /></div>
          <div><Label htmlFor="allergies">Allergies (comma-separated)</Label><Textarea id="allergies" value={formData.allergies as string || ''} onChange={e => handleChange('allergies', e.target.value)} /></div>
          <div><Label htmlFor="medicalConditions">Medical Conditions (comma-separated)</Label><Textarea id="medicalConditions" value={formData.medicalConditions as string || ''} onChange={e => handleChange('medicalConditions', e.target.value)} /></div>
          <div><Label htmlFor="currentMedications">Current Medications (comma-separated)</Label><Textarea id="currentMedications" value={formData.currentMedications as string || ''} onChange={e => handleChange('currentMedications', e.target.value)} /></div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2"><Shield className="w-4 h-4" /> Emergency Contact</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div><Label htmlFor="emergencyContactName">Name</Label><Input id="emergencyContactName" value={formData.emergencyContactName || ''} onChange={e => handleChange('emergencyContactName', e.target.value)} /></div>
            <div><Label htmlFor="emergencyContactPhone">Phone</Label><Input id="emergencyContactPhone" value={formData.emergencyContactPhone || ''} onChange={e => handleChange('emergencyContactPhone', e.target.value)} /></div>
            <div><Label htmlFor="emergencyContactRelation">Relation</Label><Input id="emergencyContactRelation" value={formData.emergencyContactRelation || ''} onChange={e => handleChange('emergencyContactRelation', e.target.value)} /></div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2"><Lock className="w-4 h-4" /> Privacy Settings</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2"><Checkbox id="enableLocationServices" checked={formData.enableLocationServices} onCheckedChange={(checked: boolean) => handleChange('enableLocationServices', checked)} /><Label htmlFor="enableLocationServices">Enable Location Services</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="allowEmergencyServices" checked={formData.allowEmergencyServices} onCheckedChange={(checked: boolean) => handleChange('allowEmergencyServices', checked)} /><Label htmlFor="allowEmergencyServices">Allow Emergency Access</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="allowAIAnalysis" checked={formData.allowAIAnalysis} onCheckedChange={(checked: boolean) => handleChange('allowAIAnalysis', checked)} /><Label htmlFor="allowAIAnalysis">Allow AI Health Analysis</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="allowDataSharing" checked={formData.allowDataSharing} onCheckedChange={(checked: boolean) => handleChange('allowDataSharing', checked)} /><Label htmlFor="allowDataSharing">Allow Anonymized Data Sharing</Label></div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}