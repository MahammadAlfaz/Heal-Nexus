import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import {
  FileText,
  Upload,
  Calendar,
  Clock,
  Eye,
  Download,
  AlertTriangle,
  Scan,
  Bot,
  MapPin,
  User,
  Mail,
  Phone,
  Stethoscope,
} from 'lucide-react';
import { fetchPatientReports, fetchAppointments, fetchProfile } from '../utils/api';
import { LayoutWithSidebar } from './LayoutWithSidebar';
import { PatientProfile } from './PatientProfile';

interface PatientDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export function PatientDashboard({ onNavigate, onLogout }: PatientDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [reports, setReports] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const userType: 'patient' = 'patient';

  useEffect(() => {
    if (activeSection === 'reports') {
      fetchReports();
    }
  }, [activeSection]);

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const patientId = localStorage.getItem('userId');
      if (!patientId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }
      const data = await fetchPatientReports(patientId);
      setReports(data);
    } catch (err: any) {
      console.error('Error fetching reports:', err);
      setError(err.message || 'Unable to fetch reports');
    } finally {
      setLoading(false);
    }
  };

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
        if (profile) setProfileData(profile);

      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const refreshProfileData = async () => {
    const patientId = localStorage.getItem('userId');
    if (!patientId) {
      setError("User not logged in.");
      return;
    }
    const profile = await fetchProfile(patientId);
    if (profile) setProfileData(profile);
  };

  const renderDashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-black text-black mb-2">
          {loading ? (
            <span className="h-8 bg-gray-200 rounded w-1/2 inline-block animate-pulse"></span>
          ) : (
            `Welcome back, ${profileData?.fullName || 'Patient'}!`
          )}
        </h1>
        <p className="text-base text-gray-600">Here's an overview of your health dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="border-gray-200 shadow-sm rounded-xl sm:rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="font-semibold text-black">Total Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-4 sm:px-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-1">{reports.length}</div>
            <p className="text-xs sm:text-sm text-gray-500">Medical documents</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-xl sm:rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="font-semibold text-black">Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-4 sm:px-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-1">{appointments.length}</div>
            <p className="text-xs sm:text-sm text-gray-500">Upcoming visits</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-xl sm:rounded-2xl sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="font-semibold text-black">Last Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-4 sm:px-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-1">3d</div>
            <p className="text-xs sm:text-sm text-gray-500">Days ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200 shadow-sm rounded-xl sm:rounded-2xl">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="font-bold text-black text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription className="text-sm sm:text-base">Access key features quickly</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base py-3 sm:py-4"
              onClick={() => onNavigate('upload-report')}
            >
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Upload Report</span>
              <span className="sm:hidden">Upload</span>
            </Button>
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base py-3 sm:py-4"
              onClick={() => onNavigate('emergency-services')}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Emergency SOS</span>
              <span className="sm:hidden">SOS</span>
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg sm:rounded-xl font-semibold border-gray-300 text-sm sm:text-base py-3 sm:py-4"
              onClick={() => onNavigate('medicine-scanner')}
            >
              <Scan className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Scan Medicine</span>
              <span className="sm:hidden">Scan</span>
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg sm:rounded-xl font-semibold border-gray-300 text-sm sm:text-base py-3 sm:py-4"
              onClick={() => onNavigate('health-assistant')}
            >
              <Bot className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg sm:rounded-xl font-semibold border-gray-300 text-sm sm:text-base py-3 sm:py-4"
              onClick={() => onNavigate('appointment-booking')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg sm:rounded-xl font-semibold border-gray-300 text-sm sm:text-base py-3 sm:py-4"
              onClick={() => onNavigate('hospital-finder')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Find Hospitals</span>
              <span className="sm:hidden">Hospitals</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="border-gray-200 shadow-sm rounded-xl sm:rounded-2xl">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="font-bold text-black text-lg sm:text-xl">Recent Reports</CardTitle>
          <CardDescription className="text-sm sm:text-base">Your latest medical documents</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Type</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">Doctor</TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.slice(0, 5).map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium text-sm sm:text-base">
                        <div>
                          <div className="font-medium">{report.type}</div>
                          <div className="text-xs text-gray-500 sm:hidden">{report.date}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm hidden sm:table-cell">{report.date}</TableCell>
                      <TableCell className="text-sm hidden md:table-cell">{report.doctor}</TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${report.status === 'Reviewed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded text-xs px-2 py-1 h-8"
                            onClick={() => onNavigate('view-report', report)}
                          >
                            <Eye className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded text-xs px-2 py-1 h-8"
                          >
                            <Download className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="border-gray-200 shadow-sm rounded-xl sm:rounded-2xl">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="font-bold text-black text-lg sm:text-xl">Upcoming Appointments</CardTitle>
          <CardDescription className="text-sm sm:text-base">Your upcoming scheduled visits</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Doctor</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">Time</TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.length > 0 ? appointments.slice(0, 5).map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium text-sm sm:text-base">
                        <div>
                          <div className="font-medium">{appointment.doctor?.fullName || 'Unknown Doctor'}</div>
                          <div className="text-xs text-gray-500 sm:hidden">
                            {new Date(appointment.appointmentDate).toLocaleDateString()} at {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm hidden sm:table-cell">{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm hidden md:table-cell">{new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${appointment.status === 'Confirmed' || appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="rounded text-xs px-2 py-1 h-8">
                          <Eye className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">Details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={5} className="text-center py-8 text-sm sm:text-base">No upcoming appointments.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
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
          return <PatientProfile patient={profileData} onProfileUpdate={refreshProfileData} />;
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
