import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Sidebar } from './Sidebar';
import {
  Users,
  FileText,
  Search,
  Eye,
  Plus,
  Clock,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  Calendar,
  Stethoscope,
  Activity,
  CheckCircle,
  Star,
  Bell,
  Edit,
  BarChart,
  Filter,
  Scan
} from 'lucide-react';
import { fetchAppointments, fetchDoctorReports, fetchProfile } from '../utils/api';
import { LayoutWithSidebar } from './LayoutWithSidebar';

interface DoctorDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export function DoctorDashboard({ onNavigate, onLogout }: DoctorDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  // Handle profile navigation
  React.useEffect(() => {
    if (activeSection === 'profile') {
      onNavigate('user-profile');
    }
  }, [activeSection, onNavigate]);

  // Fetch doctor appointments on component mount
  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        setLoading(true);
        // Get doctor ID from localStorage or context
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const currentDoctorId = userData.id;

        if (currentDoctorId) {
          setDoctorId(currentDoctorId);
          const appointmentsData = await fetchAppointments(currentDoctorId, 'doctor');
          setAppointments(appointmentsData);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, []);

  const mockPatients = [
    {
      id: 1,
      name: 'John Doe',
      patientId: 'P001',
      lastVisit: '2024-01-15',
      reportsCount: 5,
      status: 'Active',
      nextAppointment: '2024-01-25',
      age: 45,
      condition: 'Hypertension',
      phone: '(555) 123-4567',
      email: 'john.doe@email.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      patientId: 'P002',
      lastVisit: '2024-01-12',
      reportsCount: 3,
      status: 'Active',
      nextAppointment: '2024-01-22',
      age: 32,
      condition: 'Diabetes',
      phone: '(555) 234-5678',
      email: 'jane.smith@email.com'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      patientId: 'P003',
      lastVisit: '2024-01-10',
      reportsCount: 7,
      status: 'Active',
      nextAppointment: '2024-01-20',
      age: 28,
      condition: 'Asthma',
      phone: '(555) 345-6789',
      email: 'mike.johnson@email.com'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      patientId: 'P004',
      lastVisit: '2024-01-08',
      reportsCount: 2,
      status: 'Active',
      nextAppointment: '2024-01-28',
      age: 55,
      condition: 'Arthritis',
      phone: '(555) 456-7890',
      email: 'sarah.wilson@email.com'
    },
    {
      id: 5,
      name: 'David Brown',
      patientId: 'P005',
      lastVisit: '2024-01-05',
      reportsCount: 4,
      status: 'Active',
      nextAppointment: '2024-01-30',
      age: 38,
      condition: 'Heart Disease',
      phone: '(555) 567-8901',
      email: 'david.brown@email.com'
    }
  ];

  const mockAppointments = [
    { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 3, patient: 'Mike Johnson', time: '02:00 PM', type: 'Emergency', status: 'Urgent' },
    { id: 4, patient: 'Sarah Wilson', time: '03:30 PM', type: 'Routine', status: 'Confirmed' }
  ];

  const renderMainDashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-purple-50 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-secondary/5 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2">Good morning, Dr. Williams! 👨‍⚕️</h1>
              <p className="text-sm sm:text-base text-gray-600">You have 8 patients scheduled today and 5 reports pending review.</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
                <Badge className="bg-green-50 text-green-600 border-green-200 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Licensed Physician
                </Badge>
                <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  4.9 Rating
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button
                onClick={() => onNavigate('emergency-response')}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Emergency Center
              </Button>
              <Button
                onClick={() => onNavigate('telehealth-consultation')}
                className="bg-secondary hover:bg-secondary/90 text-white rounded-xl text-sm"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Telehealth
              </Button>
              <Button
                onClick={() => onNavigate('patient-monitoring')}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm"
              >
                <Activity className="w-4 h-4 mr-2" />
                Patient Monitoring
              </Button>
              <Button
                onClick={() => onNavigate('medicine-verification')}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm"
              >
                <Scan className="w-4 h-4 mr-2" />
                Medicine Verification
              </Button>
              <Button
                onClick={() => onNavigate('report-analysis')}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm"
              >
                <BarChart className="w-4 h-4 mr-2" />
                AI Analysis
              </Button>
              <Button
                onClick={() => onNavigate('appointment-management')}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-sm sm:text-base">Patients Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl text-gray-900 mb-1">8</div>
            <p className="text-xs sm:text-sm text-gray-600">Scheduled appointments</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <span className="text-sm sm:text-base">Pending Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl text-gray-900 mb-1">5</div>
            <p className="text-xs sm:text-sm text-gray-600">Need your review</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <span className="text-sm sm:text-base">Next Appointment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl text-gray-900 mb-1">9:00 AM</div>
            <p className="text-xs sm:text-sm text-gray-600">John Doe - Follow-up</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <span className="text-sm sm:text-base">Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl text-gray-900 mb-1">95%</div>
            <p className="text-xs sm:text-sm text-gray-600">Patient satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Appointments
          </CardTitle>
          <CardDescription>Your scheduled patients for today</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-gray-600">Loading appointments...</span>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {appointment.patient ? appointment.patient.name : 'Unknown Patient'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleTimeString() : 'Time not set'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={appointment.status === 'Urgent' ? 'destructive' : 'default'}
                      className="rounded-lg text-xs"
                    >
                      {appointment.status || 'Scheduled'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No appointments scheduled for today.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reports Pending Review */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary" />
            Reports Pending Review
          </CardTitle>
          <CardDescription>Latest reports that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Patient</TableHead>
                  <TableHead className="hidden sm:table-cell">Report Type</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { patient: 'John Doe', type: 'Blood Test', date: '2024-01-15', priority: 'High' },
                  { patient: 'Jane Smith', type: 'X-Ray', date: '2024-01-14', priority: 'Medium' },
                  { patient: 'Mike Johnson', type: 'CT Scan', date: '2024-01-13', priority: 'High' }
                ].map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.patient}</TableCell>
                    <TableCell className="hidden sm:table-cell">{report.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={report.priority === 'High' ? 'destructive' : 'default'}
                        className="rounded-lg text-xs"
                      >
                        {report.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => onNavigate('view-report', report)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
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

  const renderSearch = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-gray-900">Patient Search</h2>
          <p className="text-gray-600">Find and manage patient records</p>
        </div>
      </div>

      {/* Search Interface */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-black" />
            Search Patients
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by patient name, ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
              />
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white px-6 rounded-xl">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            {searchQuery ? `Showing results for "${searchQuery}"` : 'Recent patients'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Patient ID</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.filter((patient: any) =>
                  searchQuery === '' ||
                  patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((patient: any) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{patient.patientId}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{patient.lastVisit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedPatient(patient)}
                          className="rounded-lg"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-800 text-white rounded-lg"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setActiveSection('patients');
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
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

  const renderReportsSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-gray-900">Report Management</h2>
          <p className="text-gray-600">Review and analyze patient reports</p>
        </div>
        <Button 
          onClick={() => onNavigate('report-analysis')}
          className="bg-black hover:bg-gray-800 text-white rounded-xl"
        >
          <BarChart className="w-4 h-4 mr-2" />
          Advanced Analysis
        </Button>
      </div>

      {/* Report Filters */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-black" />
            Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black">
              <option>All Types</option>
              <option>Blood Test</option>
              <option>X-Ray</option>
              <option>CT Scan</option>
              <option>MRI</option>
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black">
              <option>All Status</option>
              <option>Pending</option>
              <option>Reviewed</option>
              <option>Requires Follow-up</option>
            </select>
            <input
              type="date"
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Patient Reports</CardTitle>
          <CardDescription>Latest reports requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden sm:table-cell">Report Type</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { patientName: 'John Doe', type: 'Blood Test', date: '2024-01-15', priority: 'High', status: 'Pending Review' },
                  { patientName: 'Jane Smith', type: 'X-Ray', date: '2024-01-14', priority: 'Medium', status: 'Pending Review' },
                  { patientName: 'Mike Johnson', type: 'CT Scan', date: '2024-01-13', priority: 'High', status: 'Requires Follow-up' },
                  { patientName: 'Sarah Wilson', type: 'MRI', date: '2024-01-12', priority: 'Low', status: 'Reviewed' }
                ].map((report: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.patientName}</TableCell>
                    <TableCell className="hidden sm:table-cell">{report.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={report.priority === 'High' ? 'destructive' :
                                report.priority === 'Medium' ? 'default' : 'secondary'}
                        className="rounded-lg text-xs"
                      >
                        {report.priority || 'Medium'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        variant={report.status === 'Pending Review' ? 'destructive' :
                                report.status === 'Requires Follow-up' ? 'default' : 'secondary'}
                        className="rounded-lg text-xs"
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigate('view-report', report)}
                          className="rounded-lg"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg border-gray-300"
                          onClick={() => {
                            setDoctorNotes(`Review notes for ${report.patientName} - ${report.type}`);
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Note
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

  const renderPatientsSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-gray-900">Patient Management</h2>
          <p className="text-gray-600">View and manage your patient records</p>
        </div>
        <Button 
          onClick={() => onNavigate('patient-monitoring')}
          className="bg-black hover:bg-gray-800 text-white rounded-xl"
        >
          <Activity className="w-4 h-4 mr-2" />
          Monitor Patients
        </Button>
      </div>

      {selectedPatient && (
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-black" />
              Patient Details - {selectedPatient.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Patient ID</label>
                <p className="text-gray-900">{selectedPatient.patientId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{selectedPatient.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Visit</label>
                <p className="text-gray-900">{selectedPatient.lastVisit}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Condition</label>
                <p className="text-gray-900">{selectedPatient.condition}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Doctor Notes</label>
              <textarea
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="Add notes about this patient..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                rows={4}
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="bg-black hover:bg-gray-800 text-white rounded-xl"
                onClick={() => alert('Notes saved successfully!')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Save Notes
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedPatient(null)}
                className="rounded-xl border-gray-300"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Patients List */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>Manage your patient database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Patient ID</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                  <TableHead className="hidden xl:table-cell">Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.map((patient: any) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{patient.patientId}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{patient.lastVisit}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <Badge variant="outline" className="rounded-lg text-xs">
                        {patient.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedPatient(patient)}
                          className="rounded-lg"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-800 text-white rounded-lg"
                          onClick={() => onNavigate('telehealth-consultation', patient)}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Consult
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

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderMainDashboard();
      case 'search':
        return renderSearch();
      case 'reports':
        return renderReportsSection();
      case 'patients':
        return renderPatientsSection();
      case 'profile':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl text-gray-900">Profile Settings</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your professional profile and preferences</p>
            </div>
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Update your medical credentials and contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Profile settings would be implemented here with forms for updating doctor information, medical license details, specializations, and contact preferences.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderMainDashboard();
    }
  };

  return (
    <LayoutWithSidebar
      userType="doctor"
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      {renderContent()}
    </LayoutWithSidebar>
  );
}
