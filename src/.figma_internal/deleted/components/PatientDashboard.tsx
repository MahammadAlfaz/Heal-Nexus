// components/PatientDashboard.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Sidebar } from '../Sidebar';
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
  MapPin
} from 'lucide-react';

interface PatientDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export function PatientDashboard({ onNavigate, onLogout }: PatientDashboardProps) {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'reports' | 'profile'>('dashboard');

  const mockReports = [
    {
      id: 1,
      type: 'Blood Test',
      date: '2024-01-15',
      doctor: 'Dr. Smith',
      status: 'Reviewed',
      file: 'blood_test_jan_2024.pdf'
    },
    {
      id: 2,
      type: 'X-Ray',
      date: '2024-01-10',
      doctor: 'Dr. Johnson',
      status: 'Pending Review',
      file: 'xray_chest_jan_2024.pdf'
    },
    {
      id: 3,
      type: 'MRI Scan',
      date: '2024-01-05',
      doctor: 'Dr. Williams',
      status: 'Reviewed',
      file: 'mri_brain_jan_2024.pdf'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-sm sm:text-base text-gray-600">Here's an overview of your medical records and upcoming appointments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base">Total Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl text-gray-900 mb-1">12</div>
            <p className="text-xs sm:text-sm text-gray-600">Medical documents</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              <span className="text-sm sm:text-base">Latest Upload</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl text-gray-900 mb-1">3</div>
            <p className="text-xs sm:text-sm text-gray-600">Days ago</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-sm sm:text-base">Next Appointment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl text-gray-900 mb-1">Jan 20</div>
            <p className="text-xs sm:text-sm text-gray-600">Dr. Smith - 2:00 PM</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access key healthcare features quickly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl text-sm"
              onClick={() => onNavigate('upload-report')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Report
            </Button>
            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm"
              onClick={() => onNavigate('emergency-services')}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency SOS
            </Button>
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl text-sm"
              onClick={() => onNavigate('medicine-scanner')}
            >
              <Scan className="w-4 h-4 mr-2" />
              Scan Medicine
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm"
              onClick={() => onNavigate('health-assistant')}
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button
              className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm"
              onClick={() => onNavigate('appointment-booking')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm"
              onClick={() => onNavigate('hospital-finder')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Find Hospitals
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your latest medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.slice(0, 3).map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium text-sm">
                      <div>
                        <p className="truncate max-w-[120px] sm:max-w-none">{report.type}</p>
                        <p className="text-xs text-gray-500 sm:hidden truncate">{report.date}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{report.date}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{report.doctor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={report.status === 'Reviewed' ? 'default' : 'secondary'}
                        className="rounded-lg text-xs"
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg text-xs px-2 py-1"
                        onClick={() => onNavigate('view-report', report)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">View</span>
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

  const renderReports = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-gray-900">My Reports</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">View and manage all your medical reports</p>
        </div>
        <Button
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl text-sm"
          onClick={() => onNavigate('upload-report')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
      </div>

      <Card className="border-0 shadow-lg rounded-xl">
        <CardContent className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium text-sm">
                      <div>
                        <p className="truncate max-w-[120px] sm:max-w-none">{report.type}</p>
                        <p className="text-xs text-gray-500 sm:hidden truncate">{report.date}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{report.date}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{report.doctor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={report.status === 'Reviewed' ? 'default' : 'secondary'}
                        className="rounded-lg text-xs"
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
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

  const renderProfile = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-gray-900">Profile Settings</h1>
      <Card className="border-0 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Profile settings would be implemented here.</p>
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
      return renderDashboard();
    }
  };

  // Layout: use flex so sidebar width and main content are guaranteed to align
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar column: fixed width to match Sidebar internal width */}
      <div className="w-64">
        <Sidebar
          userType="patient"
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
}
