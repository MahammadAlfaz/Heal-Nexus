import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { LayoutWithSidebar } from './LayoutWithSidebar';
import {
  Pill,
  AlertTriangle,
  CheckCircle,
  X,
  Search,
  Eye,
  Shield,
  Clock,
  User,
  FileText,
  Plus,
  Database
} from 'lucide-react';

interface MedicineVerificationProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function MedicineVerification({ onNavigate, userType }: MedicineVerificationProps) {
  const [activeSection, setActiveSection] = useState('verification');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  const mockVerificationRequests = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      medicine: 'Amoxicillin 500mg',
      scannedData: 'AMX-500-GEN-2024-001',
      requestTime: '10 mins ago',
      status: 'Pending',
      severity: 'Medium',
      symptoms: 'Bacterial infection, fever',
      allergies: 'Penicillin allergy noted',
      currentMeds: 'Ibuprofen 400mg, Vitamin D',
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      patientId: 'P002',
      medicine: 'Metformin 850mg',
      scannedData: 'MET-850-BRA-2024-015',
      requestTime: '25 mins ago',
      status: 'Urgent',
      severity: 'High',
      symptoms: 'Type 2 Diabetes management',
      allergies: 'No known allergies',
      currentMeds: 'Lisinopril 10mg, Atorvastatin 20mg',
      image: '/api/placeholder/200/200'
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      patientId: 'P003',
      medicine: 'Aspirin 75mg',
      scannedData: 'ASP-075-LOW-2024-087',
      requestTime: '1 hour ago',
      status: 'Verified',
      severity: 'Low',
      symptoms: 'Cardiovascular protection',
      allergies: 'Aspirin sensitivity - use with caution',
      currentMeds: 'Ramipril 5mg, Simvastatin 40mg',
      image: '/api/placeholder/200/200'
    }
  ];

  const mockMedicineDatabase = [
    {
      name: 'Amoxicillin',
      strength: '500mg',
      form: 'Capsule',
      manufacturer: 'Generic Pharma',
      batchNo: 'AMX-500-GEN-2024-001',
      expiry: '2025-08-15',
      indications: 'Bacterial infections',
      contraindications: 'Penicillin allergy',
      sideEffects: 'Nausea, diarrhea, skin rash',
      dosage: '500mg every 8 hours',
      verified: true,
      safetyScore: 95
    },
    {
      name: 'Metformin',
      strength: '850mg',
      form: 'Tablet',
      manufacturer: 'Brand Pharma',
      batchNo: 'MET-850-BRA-2024-015',
      expiry: '2026-03-20',
      indications: 'Type 2 Diabetes',
      contraindications: 'Kidney disease, liver disease',
      sideEffects: 'Stomach upset, metallic taste',
      dosage: '850mg twice daily with meals',
      verified: true,
      safetyScore: 98
    }
  ];

  const renderVerificationDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Medicine Verification Center</h1>
        <p className="text-gray-600 mt-1">Verify and validate patient medication requests</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verifications</p>
                <p className="text-2xl text-yellow-600">8</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified Today</p>
                <p className="text-2xl text-green-600">24</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Safety Alerts</p>
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
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl text-primary">96.8%</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Requests */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            Medicine Verification Requests
          </CardTitle>
          <CardDescription>Patient medication verification requests requiring review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVerificationRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{request.patient}</span>
                        <span className="text-sm text-gray-500">({request.patientId})</span>
                      </div>
                      <Badge 
                        variant={request.status === 'Urgent' ? 'destructive' : request.status === 'Pending' ? 'secondary' : 'default'}
                        className="rounded-lg"
                      >
                        {request.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Medicine: <span className="text-gray-900 font-medium">{request.medicine}</span></p>
                        <p className="text-gray-600 mb-1">Symptoms: <span className="text-gray-900">{request.symptoms}</span></p>
                        <p className="text-gray-600">Batch: <span className="text-gray-900 font-mono text-xs">{request.scannedData}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Current Medications:</p>
                        <p className="text-xs text-gray-700">{request.currentMeds}</p>
                        {request.allergies && (
                          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {request.allergies}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medicine Database Search */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-secondary" />
            Medicine Database
          </CardTitle>
          <CardDescription>Search and verify medicine information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by medicine name, batch number, or manufacturer..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl">
              Search Database
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {mockMedicineDatabase.map((medicine, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{medicine.name} {medicine.strength}</h3>
                    <p className="text-sm text-gray-600">{medicine.form} • {medicine.manufacturer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="rounded-lg text-xs">
                      Safety: {medicine.safetyScore}%
                    </Badge>
                    {medicine.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Batch:</span> <span className="font-mono text-xs">{medicine.batchNo}</span></p>
                  <p><span className="text-gray-600">Expiry:</span> {medicine.expiry}</p>
                  <p><span className="text-gray-600">Indications:</span> {medicine.indications}</p>
                  <p><span className="text-gray-600">Dosage:</span> {medicine.dosage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVerificationDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedRequest(null)}>
          ← Back to Requests
        </Button>
        <div>
          <h1 className="text-3xl text-gray-900">Medicine Verification</h1>
          <p className="text-gray-600">Patient: {selectedRequest?.patient}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient & Medicine Info */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Patient & Medicine Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Patient Name</label>
                <p className="font-medium">{selectedRequest?.patient}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Patient ID</label>
                <p className="font-medium">{selectedRequest?.patientId}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600">Medicine Requested</label>
              <p className="font-medium text-primary">{selectedRequest?.medicine}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Scanned Batch Code</label>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded">{selectedRequest?.scannedData}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Symptoms/Condition</label>
              <p className="font-medium">{selectedRequest?.symptoms}</p>
            </div>
          </CardContent>
        </Card>

        {/* Safety Assessment */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Safety Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Medicine Verified</span>
              </div>
              <p className="text-sm text-green-700">Batch number matches database records</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Current Medications</label>
                <p className="text-sm">{selectedRequest?.currentMeds}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Known Allergies</label>
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {selectedRequest?.allergies}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-sm text-yellow-800 font-medium">⚠️ Drug Interaction Warning</p>
              <p className="text-sm text-yellow-700">Potential interaction with current medications - verify dosage</p>
            </div>
          </CardContent>
        </Card>

        {/* Verification Decision */}
        <Card className="border-0 shadow-lg rounded-2xl md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Verification Decision
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter verification notes, dosage recommendations, warnings, or alternative suggestions..."
              className="min-h-24 rounded-xl"
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
            />
            
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Medication
              </Button>
              <Button variant="outline" className="border-yellow-300 text-yellow-700 rounded-xl">
                Approve with Caution
              </Button>
              <Button variant="destructive" className="rounded-xl">
                <X className="w-4 h-4 mr-2" />
                Reject - Unsafe
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800 font-medium">Recommended Action:</p>
              <p className="text-sm text-blue-700">Approve with modified dosage: 250mg every 12 hours instead of 500mg every 8 hours due to patient's kidney function.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedRequest) {
      return renderVerificationDetails();
    }
    return renderVerificationDashboard();
  };

  return (
    <LayoutWithSidebar
      userType={userType || 'doctor'}
      activeSection="medicine-verification"
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
      onLogout={() => onNavigate('landing')}
    >
      {renderContent()}
    </LayoutWithSidebar>
  );
}