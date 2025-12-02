import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { LayoutWithSidebar } from './LayoutWithSidebar';
import {
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  User,
  Heart,
  Activity,
  Navigation,
  MessageSquare,
  CheckCircle,
  X,
  ArrowLeft
} from 'lucide-react';
import { fetchHospitals } from '../utils/api';

interface EmergencyResponseProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function EmergencyResponse({ onNavigate, userType }: EmergencyResponseProps) {
  const [activeSection, setActiveSection] = useState('alerts');
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHospitals = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHospitals();
        setHospitals(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load hospitals');
      } finally {
        setLoading(false);
      }
    };
    loadHospitals();
  }, []);

  const renderHospitalList = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Emergency Response Center</h1>
        <p className="text-gray-600 mt-1">Hospitals available for emergency response</p>
      </div>

      {loading && <p>Loading hospitals...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Hospitals List
          </CardTitle>
          <CardDescription>Hospitals registered in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hospitals.length === 0 && !loading && <p>No hospitals found.</p>}
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-lg">{hospital.name}</p>
                    <p className="text-sm text-gray-600">{hospital.address}</p>
                  </div>
                  <Badge variant="default" className="rounded-lg">
                    {hospital.type || 'General'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHospitalDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedHospital(null)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hospitals
        </Button>
        <div>
          <h1 className="text-3xl text-gray-900">Hospital Details</h1>
          <p className="text-gray-600">Name: {selectedHospital?.name}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hospital Information */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Hospital Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <p className="font-medium">{selectedHospital?.address}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Contact</label>
              <p className="font-medium">{selectedHospital?.contactNumber || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <p className="font-medium">{selectedHospital?.type || 'General'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <p className="font-medium">{selectedHospital?.description || 'No description available.'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Location & Navigation */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location & Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Hospital Location</label>
              <p className="font-medium">{selectedHospital?.address}</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Phone className="w-4 h-4 mr-2" />
                Call Hospital
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Response Actions */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Response Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter response notes, instructions for paramedics, or treatment recommendations..."
              className="min-h-24 rounded-xl"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
            <div className="flex gap-2">
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                Dispatch Ambulance
              </Button>
              <Button variant="outline" className="rounded-xl">
                Send Instructions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedHospital) {
      return renderHospitalDetails();
    }
    return renderHospitalList();
  };

  return (
    <LayoutWithSidebar
      userType={userType || 'doctor'}
      activeSection="emergency-response"
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
      onLogout={() => onNavigate('landing')}
    >
      {renderContent()}
    </LayoutWithSidebar>
  );
}
