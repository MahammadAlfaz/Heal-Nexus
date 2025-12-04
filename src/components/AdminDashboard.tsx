import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAppData } from './AppDataContext';
import { HospitalManagement } from './HospitalManagement';
import { DoctorVerification } from './DoctorVerification';
import { UserManagement } from './UserManagement';
import { MedicineDatabase } from './MedicineDatabase';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { LayoutWithSidebar } from './LayoutWithSidebar';
import {
  Users,
  Building2,
  Shield,
  Activity,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Stethoscope,
  BarChart3,
  Settings,
  Bell,
  CheckCircle,
  Clock,
  UserCheck,
  Hospital
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { systemStats, doctors, hospitals, patients, emergencyServices } = useAppData();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  const renderMainDashboard = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-black text-black mb-2">Admin Control Center</h1>
        <p className="text-base text-gray-600">
          Manage the entire Heal Nexus ecosystem with comprehensive oversight and control.
        </p>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Total Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">{systemStats.totalUsers}</div>
            <p className="text-sm text-gray-500">Active platform users</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Hospitals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">{systemStats.totalHospitals}</div>
            <p className="text-sm text-gray-500">Verified facilities</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Pending Verifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">{systemStats.pendingVerifications}</div>
            <p className="text-sm text-gray-500">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <AlertTriangle className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-black">Emergency Calls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black text-black mb-1">{systemStats.emergencyCalls}</div>
            <p className="text-sm text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Doctor Verifications */}
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-black">Pending Doctor Verifications</span>
            </CardTitle>
            <CardDescription>Doctors awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {doctors.filter(d => d.status === 'pending').slice(0, 3).map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setActiveSection('doctor-verification')}
                    variant="outline"
                    className="rounded-lg border-gray-300"
                  >
                    Review
                  </Button>
                </div>
              ))}
              {doctors.filter(d => d.status === 'pending').length === 0 && (
                <p className="text-gray-500 text-center py-4">No pending verifications</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="font-bold text-black">System Health</span>
            </CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Uptime</span>
                <Badge className="bg-green-50 text-green-600 border-green-200">99.9%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database Status</span>
                <Badge className="bg-green-50 text-green-600 border-green-200">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response</span>
                <Badge className="bg-green-50 text-green-600 border-green-200">Fast</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security Status</span>
                <Badge className="bg-green-50 text-green-600 border-green-200">Secure</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-black">Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-900">New hospital registered</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-900">Doctor verified</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-900">Emergency call logged</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Management Actions */}
      <Card className="border-gray-200 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-black">Quick Management Actions</CardTitle>
          <CardDescription>Access key administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => setActiveSection('hospital-management')}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-xl text-sm h-auto py-4"
            >
              <div className="flex flex-col items-center gap-2">
                <Hospital className="w-6 h-6" />
                <span>Manage Hospitals</span>
              </div>
            </Button>
            <Button
              onClick={() => setActiveSection('doctor-verification')}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-xl text-sm h-auto py-4"
            >
              <div className="flex flex-col items-center gap-2">
                <UserCheck className="w-6 h-6" />
                <span>Verify Doctors</span>
              </div>
            </Button>
            <Button
              onClick={() => setActiveSection('user-management')}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-xl text-sm h-auto py-4"
            >
              <div className="flex flex-col items-center gap-2">
                <Users className="w-6 h-6" />
                <span>User Management</span>
              </div>
            </Button>
            <Button
              onClick={() => setActiveSection('analytics')}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-xl text-sm h-auto py-4"
            >
              <div className="flex flex-col items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                <span>View Analytics</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderMainDashboard();
      case 'hospital-management':
        return <HospitalManagement onNavigate={onNavigate} />;
      case 'doctor-verification':
        return <DoctorVerification onNavigate={onNavigate} />;
      case 'user-management':
        return <UserManagement onNavigate={onNavigate} />;
      case 'medicine-database':
        return <MedicineDatabase onNavigate={onNavigate} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'emergency-coordination':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-gray-900">Emergency Coordination Center</h2>
            <p className="text-gray-600">Monitor and coordinate emergency services</p>
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Emergency Services Management</CardTitle>
                <CardDescription>Real-time emergency coordination dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Emergency coordination features will be implemented here, including real-time emergency calls, ambulance tracking, and hospital coordination.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'content-management':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-gray-900">Content Management</h2>
            <p className="text-gray-600">Manage platform content and resources</p>
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Content Management System</CardTitle>
                <CardDescription>Manage health articles, tips, and educational content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content management features will be implemented here, including health articles, educational resources, and community guidelines.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'system-settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-gray-900">System Settings</h2>
            <p className="text-gray-600">Configure platform-wide settings</p>
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>Manage system-wide settings and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">System configuration features will be implemented here, including API settings, security configurations, and feature toggles.</p>
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
      userType="admin"
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      {renderContent()}
    </LayoutWithSidebar>
  );
}
