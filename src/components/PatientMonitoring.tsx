import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Brain,
  Eye,
  Calendar,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Phone,
  MessageSquare,
  Bell,
  Settings
} from 'lucide-react';

interface PatientMonitoringProps {
  onNavigate: (page: string, data?: any) => void;
  userType: 'patient' | 'doctor' | null;
}

export function PatientMonitoring({ onNavigate, userType }: PatientMonitoringProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const mockPatients = [
    {
      id: 1,
      name: 'John Doe',
      patientId: 'P001',
      age: 45,
      condition: 'Hypertension',
      priority: 'High',
      status: 'Active Monitoring',
      lastUpdate: '2 mins ago',
      vitals: {
        heartRate: 78,
        bloodPressure: '140/90',
        temperature: 98.6,
        oxygenSat: 96,
        glucoseLevel: 180
      },
      alerts: 2,
      riskScore: 75
    },
    {
      id: 2,
      name: 'Jane Smith',
      patientId: 'P002',
      age: 32,
      condition: 'Diabetes Type 2',
      priority: 'Normal',
      status: 'Stable',
      lastUpdate: '15 mins ago',
      vitals: {
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 98.2,
        oxygenSat: 98,
        glucoseLevel: 220
      },
      alerts: 1,
      riskScore: 45
    },
    {
      id: 3,
      name: 'Mike Johnson',
      patientId: 'P003',
      age: 67,
      condition: 'Cardiac Arrhythmia',
      priority: 'Urgent',
      status: 'Critical',
      lastUpdate: '30 seconds ago',
      vitals: {
        heartRate: 110,
        bloodPressure: '160/100',
        temperature: 99.1,
        oxygenSat: 94,
        glucoseLevel: 95
      },
      alerts: 5,
      riskScore: 92
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      patientId: 'P004',
      age: 28,
      condition: 'Post-Surgery Recovery',
      priority: 'Normal',
      status: 'Recovering',
      lastUpdate: '5 mins ago',
      vitals: {
        heartRate: 68,
        bloodPressure: '115/75',
        temperature: 98.4,
        oxygenSat: 99,
        glucoseLevel: 90
      },
      alerts: 0,
      riskScore: 25
    }
  ];

  const mockAlerts = [
    {
      id: 1,
      patientName: 'Mike Johnson',
      type: 'Critical',
      message: 'Heart rate elevated above threshold (110 BPM)',
      time: '30 seconds ago',
      severity: 'high'
    },
    {
      id: 2,
      patientName: 'John Doe',
      type: 'Warning',
      message: 'Blood pressure reading: 140/90 mmHg',
      time: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: 3,
      patientName: 'Jane Smith',
      type: 'Info',
      message: 'Medication reminder due in 30 minutes',
      time: '10 minutes ago',
      severity: 'low'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Active Patients</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Critical Alerts</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Stable</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Avg Response</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">4m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Bell className="w-5 h-5 text-red-500" />
            Active Alerts
          </CardTitle>
          <CardDescription className="text-sm">Real-time patient alerts requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    alert.severity === 'high' ? 'bg-red-500' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm">{alert.patientName}</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{alert.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-base sm:text-lg">Patient Monitoring List</CardTitle>
              <CardDescription className="text-sm">Currently monitored patients</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10 rounded-xl text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Patient</TableHead>
                  <TableHead className="hidden sm:table-cell">Condition</TableHead>
                  <TableHead className="hidden md:table-cell">Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Update</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients
                  .filter(patient => 
                    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-gray-600">{patient.patientId} • Age {patient.age}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-sm">{patient.condition}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Progress value={patient.riskScore} className="w-16 h-2" />
                        <span className="text-xs text-gray-600">{patient.riskScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          patient.priority === 'Urgent' ? 'destructive' : 
                          patient.priority === 'High' ? 'default' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-xs text-gray-600">{patient.lastUpdate}</span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-lg text-xs px-2 py-1"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
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

  const renderPatientDetail = () => {
    if (!selectedPatient) return null;

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              onClick={() => setSelectedPatient(null)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-medium text-gray-900">{selectedPatient.name}</h1>
              <p className="text-sm text-gray-600">{selectedPatient.patientId} • {selectedPatient.condition}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <MessageSquare className="w-4 h-4 mr-1" />
              Message
            </Button>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Heart Rate</p>
                <p className="text-lg font-medium text-gray-900">{selectedPatient.vitals.heartRate}</p>
                <p className="text-xs text-gray-500">BPM</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <Activity className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Blood Pressure</p>
                <p className="text-lg font-medium text-gray-900">{selectedPatient.vitals.bloodPressure}</p>
                <p className="text-xs text-gray-500">mmHg</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Temperature</p>
                <p className="text-lg font-medium text-gray-900">{selectedPatient.vitals.temperature}</p>
                <p className="text-xs text-gray-500">°F</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Oxygen Sat</p>
                <p className="text-lg font-medium text-gray-900">{selectedPatient.vitals.oxygenSat}</p>
                <p className="text-xs text-gray-500">%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Glucose</p>
                <p className="text-lg font-medium text-gray-900">{selectedPatient.vitals.glucoseLevel}</p>
                <p className="text-xs text-gray-500">mg/dL</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Assessment */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Risk Assessment</CardTitle>
            <CardDescription className="text-sm">Current patient risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Risk Score</span>
                <span className="font-medium text-gray-900">{selectedPatient.riskScore}%</span>
              </div>
              <Progress value={selectedPatient.riskScore} className="h-3" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Low Risk</p>
                  <p className="text-lg font-medium text-green-600">0-30%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Medium Risk</p>
                  <p className="text-lg font-medium text-yellow-600">31-70%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">High Risk</p>
                  <p className="text-lg font-medium text-red-600">71-100%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              onClick={() => onNavigate('doctor-dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">Patient Monitoring</h1>
              <p className="text-sm text-gray-600">Real-time patient health monitoring and alerts</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="alerts" className="text-sm">Alerts</TabsTrigger>
            <TabsTrigger value="trends" className="hidden sm:block text-sm">Trends</TabsTrigger>
            <TabsTrigger value="reports" className="hidden lg:block text-sm">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {selectedPatient ? renderPatientDetail() : renderOverview()}
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Alert Management</CardTitle>
                <CardDescription>Configure and manage patient alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Alert management interface will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Health Trends</CardTitle>
                <CardDescription>Patient health trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Health trend charts and analysis will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Monitoring Reports</CardTitle>
                <CardDescription>Generated monitoring and analysis reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monitoring reports will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}