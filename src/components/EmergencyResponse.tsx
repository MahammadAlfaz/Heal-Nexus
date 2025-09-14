import { useState } from 'react';
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

interface EmergencyResponseProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function EmergencyResponse({ onNavigate, userType }: EmergencyResponseProps) {
  const [activeSection, setActiveSection] = useState('alerts');
  const [selectedEmergency, setSelectedEmergency] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState('');

  const mockEmergencies = [
    {
      id: 1,
      patient: 'John Doe',
      age: 45,
      condition: 'Chest Pain',
      severity: 'Critical',
      location: '123 Main St, City Center',
      distance: '0.8 miles',
      time: '2 mins ago',
      status: 'Pending',
      vitals: { heartRate: 120, bloodPressure: '180/110', oxygen: '92%' },
      symptoms: 'Severe chest pain, shortness of breath, sweating',
      medicalHistory: 'Hypertension, Diabetes Type 2'
    },
    {
      id: 2,
      patient: 'Mary Johnson',
      age: 67,
      condition: 'Fall Injury',
      severity: 'High',
      location: '456 Oak Ave, Downtown',
      distance: '1.2 miles',
      time: '5 mins ago',
      status: 'En Route',
      vitals: { heartRate: 95, bloodPressure: '160/90', oxygen: '95%' },
      symptoms: 'Hip pain, unable to stand, minor head injury',
      medicalHistory: 'Osteoporosis, Previous hip surgery'
    },
    {
      id: 3,
      patient: 'Robert Smith',
      age: 32,
      condition: 'Allergic Reaction',
      severity: 'High',
      location: '789 Pine St, Suburb',
      distance: '2.1 miles',
      time: '8 mins ago',
      status: 'Responded',
      vitals: { heartRate: 110, bloodPressure: '140/85', oxygen: '88%' },
      symptoms: 'Facial swelling, difficulty breathing, rash',
      medicalHistory: 'Known food allergies (peanuts, shellfish)'
    }
  ];

  const renderEmergencyAlerts = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Emergency Response Center</h1>
        <p className="text-gray-600 mt-1">Real-time emergency alerts and patient management</p>
      </div>

      {/* Emergency Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Emergencies</p>
                <p className="text-2xl text-red-600">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl text-primary">4.2 min</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Cases</p>
                <p className="text-2xl text-secondary">12</p>
              </div>
              <Activity className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl text-green-600">98.5%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alerts */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Live Emergency Alerts
          </CardTitle>
          <CardDescription>Incoming emergency requests requiring medical response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEmergencies.map((emergency) => (
              <div key={emergency.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{emergency.patient}</span>
                        <span className="text-sm text-gray-500">({emergency.age} years)</span>
                      </div>
                      <Badge 
                        variant={emergency.severity === 'Critical' ? 'destructive' : 'default'}
                        className="rounded-lg"
                      >
                        {emergency.severity}
                      </Badge>
                      <Badge 
                        variant={emergency.status === 'Pending' ? 'secondary' : 'default'}
                        className="rounded-lg"
                      >
                        {emergency.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Condition: <span className="text-gray-900 font-medium">{emergency.condition}</span></p>
                        <p className="text-gray-600 mb-1">Symptoms: <span className="text-gray-900">{emergency.symptoms}</span></p>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{emergency.location} ({emergency.distance})</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Vitals:</p>
                        <div className="flex gap-4 text-xs">
                          <span>HR: {emergency.vitals.heartRate}</span>
                          <span>BP: {emergency.vitals.bloodPressure}</span>
                          <span>O2: {emergency.vitals.oxygen}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 mt-2">
                          <Clock className="w-4 h-4" />
                          <span>{emergency.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => setSelectedEmergency(emergency)}
                    >
                      View Details
                    </Button>
                    {emergency.status === 'Pending' && (
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmergencyDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedEmergency(null)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Alerts
        </Button>
        <div>
          <h1 className="text-3xl text-gray-900">Emergency Details</h1>
          <p className="text-gray-600">Patient: {selectedEmergency?.patient}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="font-medium">{selectedEmergency?.patient}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Age</label>
                <p className="font-medium">{selectedEmergency?.age} years</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600">Primary Condition</label>
              <p className="font-medium text-red-600">{selectedEmergency?.condition}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Symptoms</label>
              <p className="font-medium">{selectedEmergency?.symptoms}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Medical History</label>
              <p className="font-medium">{selectedEmergency?.medicalHistory}</p>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Current Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-2xl text-red-600">{selectedEmergency?.vitals.heartRate}</p>
                <p className="text-xs text-gray-500">BPM</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-2xl text-blue-600">{selectedEmergency?.vitals.bloodPressure}</p>
                <p className="text-xs text-gray-500">mmHg</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Oxygen Saturation</p>
                <p className="text-2xl text-green-600">{selectedEmergency?.vitals.oxygen}</p>
                <p className="text-xs text-gray-500">SpO2</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl text-yellow-600">{selectedEmergency?.time}</p>
                <p className="text-xs text-gray-500">Elapsed</p>
              </div>
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
              <label className="text-sm text-gray-600">Patient Location</label>
              <p className="font-medium">{selectedEmergency?.location}</p>
              <p className="text-sm text-gray-500">Distance: {selectedEmergency?.distance}</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Phone className="w-4 h-4 mr-2" />
                Call Patient
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
    if (selectedEmergency) {
      return renderEmergencyDetails();
    }
    return renderEmergencyAlerts();
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