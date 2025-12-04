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
  Hospital,
  FileText,
  Eye,
  Tag,
  Plus,
  Upload
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
                    <p className="font-medium text-gray-900">{doctor.fullName}</p>
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
            <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              <h1 className="text-2xl lg:text-3xl font-black text-black mb-2">Emergency Coordination Center</h1>
              <p className="text-base text-gray-600">
                Real-time monitoring and coordination of emergency services across the platform.
              </p>
            </div>

            {/* Emergency Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="border-red-200 bg-red-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-black">Active Emergencies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-red-600 mb-1">12</div>
                  <p className="text-sm text-gray-600">Currently in progress</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-black">Response Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-blue-600 mb-1">4.2m</div>
                  <p className="text-sm text-gray-600">Average response</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-black">Resolved Today</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-green-600 mb-1">47</div>
                  <p className="text-sm text-gray-600">Successfully handled</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Hospital className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-black">Ambulances Active</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-orange-600 mb-1">8</div>
                  <p className="text-sm text-gray-600">On duty</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Emergency Calls */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-black">Active Emergency Calls</span>
                </CardTitle>
                <CardDescription>Real-time emergency situations requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, patient: 'John Doe', location: 'Downtown Area', type: 'Heart Attack', status: 'En Route', priority: 'Critical', time: '2 min ago' },
                    { id: 2, patient: 'Jane Smith', location: 'Residential Zone', type: 'Car Accident', status: 'Dispatching', priority: 'High', time: '5 min ago' },
                    { id: 3, patient: 'Mike Johnson', location: 'Industrial Area', type: 'Work Injury', status: 'At Scene', priority: 'Medium', time: '8 min ago' },
                    { id: 4, patient: 'Sarah Wilson', location: 'Shopping District', type: 'Fainting', status: 'Hospital Transfer', priority: 'Low', time: '12 min ago' },
                  ].map((emergency) => (
                    <div key={emergency.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          emergency.priority === 'Critical' ? 'bg-red-500' :
                          emergency.priority === 'High' ? 'bg-orange-500' :
                          emergency.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <p className="font-semibold text-gray-900">{emergency.patient}</p>
                          <p className="text-sm text-gray-600">{emergency.location} • {emergency.type}</p>
                          <p className="text-xs text-gray-500">{emergency.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${
                          emergency.status === 'En Route' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          emergency.status === 'Dispatching' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                          emergency.status === 'At Scene' ? 'bg-red-50 text-red-600 border-red-200' :
                          'bg-green-50 text-green-600 border-green-200'
                        } px-3 py-1`}>
                          {emergency.status}
                        </Badge>
                        <Button size="sm" variant="outline" className="rounded-lg border-gray-300">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ambulance Tracking & Hospital Coordination */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hospital className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-black">Ambulance Tracking</span>
                  </CardTitle>
                  <CardDescription>Real-time location and status of emergency vehicles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 'AMB-001', status: 'En Route', destination: 'City Hospital', eta: '5 min' },
                      { id: 'AMB-002', status: 'At Scene', destination: 'Emergency Room', eta: 'On Site' },
                      { id: 'AMB-003', status: 'Available', destination: 'Station 1', eta: 'Ready' },
                      { id: 'AMB-004', status: 'Returning', destination: 'Station 2', eta: '15 min' },
                    ].map((ambulance) => (
                      <div key={ambulance.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{ambulance.id}</p>
                          <p className="text-sm text-gray-600">{ambulance.destination}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${
                            ambulance.status === 'Available' ? 'bg-green-50 text-green-600 border-green-200' :
                            ambulance.status === 'En Route' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                            ambulance.status === 'At Scene' ? 'bg-red-50 text-red-600 border-red-200' :
                            'bg-gray-50 text-gray-600 border-gray-200'
                          }`}>
                            {ambulance.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">ETA: {ambulance.eta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-black">Hospital Coordination</span>
                  </CardTitle>
                  <CardDescription>Emergency bed availability and hospital status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'City General Hospital', beds: 12, total: 50, status: 'Available' },
                      { name: 'Metro Medical Center', beds: 3, total: 30, status: 'Limited' },
                      { name: 'Regional Hospital', beds: 0, total: 25, status: 'Full' },
                      { name: 'Community Health Center', beds: 8, total: 20, status: 'Available' },
                    ].map((hospital) => (
                      <div key={hospital.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{hospital.name}</p>
                          <p className="text-sm text-gray-600">Emergency Beds: {hospital.beds}/{hospital.total}</p>
                        </div>
                        <Badge className={`${
                          hospital.status === 'Available' ? 'bg-green-50 text-green-600 border-green-200' :
                          hospital.status === 'Limited' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {hospital.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Response Protocols */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-black">Emergency Response Protocols</span>
                </CardTitle>
                <CardDescription>Standard operating procedures for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      <span>Activate Emergency Protocol</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Bell className="w-6 h-6" />
                      <span>Send Mass Alert</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      <span>Resource Allocation</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'content-management':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              <h1 className="text-2xl lg:text-3xl font-black text-black mb-2">Content Management System</h1>
              <p className="text-base text-gray-600">
                Create, edit, and manage health articles, educational content, and platform resources.
              </p>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="border-blue-200 bg-blue-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-black">Total Articles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-blue-600 mb-1">147</div>
                  <p className="text-sm text-gray-600">Published content</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Eye className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-black">Total Views</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-green-600 mb-1">24.5K</div>
                  <p className="text-sm text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-black">Draft Articles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-orange-600 mb-1">8</div>
                  <p className="text-sm text-gray-600">Awaiting review</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Tag className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-black">Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-purple-600 mb-1">12</div>
                  <p className="text-sm text-gray-600">Content categories</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="font-bold text-black">Quick Actions</CardTitle>
                <CardDescription>Create and manage content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="w-6 h-6" />
                      <span>New Article</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6" />
                      <span>Upload Media</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Tag className="w-6 h-6" />
                      <span>Manage Categories</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <BarChart3 className="w-6 h-6" />
                      <span>View Analytics</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Articles */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-black">Recent Articles</span>
                </CardTitle>
                <CardDescription>Latest published and draft content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, title: 'Understanding Heart Health: Prevention and Care', author: 'Dr. Sarah Johnson', status: 'Published', category: 'Cardiology', views: 1250, date: '2024-01-15' },
                    { id: 2, title: 'Mental Health Awareness: Breaking the Stigma', author: 'Dr. Michael Chen', status: 'Published', category: 'Mental Health', views: 890, date: '2024-01-14' },
                    { id: 3, title: 'Nutrition Guide for Diabetes Management', author: 'Dr. Emily Davis', status: 'Draft', category: 'Nutrition', views: 0, date: '2024-01-13' },
                    { id: 4, title: 'COVID-19 Vaccine Updates and Safety', author: 'Dr. Robert Wilson', status: 'Published', category: 'Infectious Diseases', views: 2100, date: '2024-01-12' },
                    { id: 5, title: 'Pediatric Care: Common Childhood Illnesses', author: 'Dr. Lisa Thompson', status: 'Review', category: 'Pediatrics', views: 0, date: '2024-01-11' },
                  ].map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{article.title}</p>
                          <p className="text-sm text-gray-600">By {article.author} • {article.category}</p>
                          <p className="text-xs text-gray-500">{article.date} • {article.views} views</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${
                          article.status === 'Published' ? 'bg-green-50 text-green-600 border-green-200' :
                          article.status === 'Draft' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                          'bg-orange-50 text-orange-600 border-orange-200'
                        }`}>
                          {article.status}
                        </Badge>
                        <Button size="sm" variant="outline" className="rounded-lg border-gray-300">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-500" />
                    <span className="font-bold text-black">Content Categories</span>
                  </CardTitle>
                  <CardDescription>Organize content by medical specialties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Cardiology', articles: 23, color: 'bg-red-50 text-red-600 border-red-200' },
                      { name: 'Mental Health', articles: 18, color: 'bg-blue-50 text-blue-600 border-blue-200' },
                      { name: 'Nutrition', articles: 15, color: 'bg-green-50 text-green-600 border-green-200' },
                      { name: 'Pediatrics', articles: 12, color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
                      { name: 'Infectious Diseases', articles: 9, color: 'bg-purple-50 text-purple-600 border-purple-200' },
                      { name: 'General Health', articles: 35, color: 'bg-gray-50 text-gray-600 border-gray-200' },
                    ].map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-sm text-gray-600">{category.articles} articles</p>
                        </div>
                        <Badge className={category.color}>
                          {category.articles}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-black">Content Performance</span>
                  </CardTitle>
                  <CardDescription>Most popular articles this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: 'Heart Attack Warning Signs', views: 3200, growth: '+15%' },
                      { title: 'Mental Health First Aid', views: 2800, growth: '+22%' },
                      { title: 'COVID-19 Prevention Guide', views: 2500, growth: '+8%' },
                      { title: 'Diabetes Management Tips', views: 2100, growth: '+12%' },
                      { title: 'Child Vaccination Schedule', views: 1900, growth: '+18%' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.views} views</p>
                        </div>
                        <Badge className="bg-green-50 text-green-600 border-green-200 text-xs">
                          {item.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'system-settings':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              <h1 className="text-2xl lg:text-3xl font-black text-black mb-2">System Settings</h1>
              <p className="text-base text-gray-600">
                Configure platform-wide settings, API configurations, and system preferences.
              </p>
            </div>

            {/* System Health Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="border-green-200 bg-green-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Activity className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-black">System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-green-600 mb-1">Online</div>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-black">Uptime</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-blue-600 mb-1">99.9%</div>
                  <p className="text-sm text-gray-600">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-black">Last Backup</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-orange-600 mb-1">2h ago</div>
                  <p className="text-sm text-gray-600">Automated backup</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50 shadow-sm rounded-2xl">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-black">Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-black text-purple-600 mb-1">Secure</div>
                  <p className="text-sm text-gray-600">All checks passed</p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Configuration */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-black">Platform Configuration</span>
                </CardTitle>
                <CardDescription>Core system settings and feature toggles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                      <input
                        type="text"
                        defaultValue="Heal Nexus"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>UTC-8 (PST)</option>
                        <option>UTC-5 (EST)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+1 (CET)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max File Upload Size</label>
                      <input
                        type="text"
                        defaultValue="10MB"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                      <input
                        type="text"
                        defaultValue="30 minutes"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit</label>
                      <input
                        type="text"
                        defaultValue="1000 requests/hour"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Toggles */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-black">Feature Toggles</span>
                </CardTitle>
                <CardDescription>Enable or disable platform features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Emergency Services', enabled: true, description: 'Real-time emergency response system' },
                      { name: 'AI Health Assistant', enabled: true, description: 'AI-powered health recommendations' },
                      { name: 'Appointment Booking', enabled: true, description: 'Online appointment scheduling' },
                      { name: 'Medicine Scanner', enabled: true, description: 'OCR-based medicine identification' },
                      { name: 'Community Support', enabled: true, description: 'User community and forums' },
                    ].map((feature) => (
                      <div key={feature.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{feature.name}</p>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={feature.enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Video Consultations', enabled: false, description: 'Telemedicine video calls' },
                      { name: 'Advanced Analytics', enabled: true, description: 'Detailed platform analytics' },
                      { name: 'Push Notifications', enabled: true, description: 'Mobile push notifications' },
                      { name: 'Multi-language Support', enabled: false, description: 'Support for multiple languages' },
                      { name: 'Offline Mode', enabled: false, description: 'Limited offline functionality' },
                    ].map((feature) => (
                      <div key={feature.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{feature.name}</p>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={feature.enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Settings */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-black">API Settings</span>
                </CardTitle>
                <CardDescription>Configure external API integrations and endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
                      <input
                        type="password"
                        placeholder="Enter API key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
                      <input
                        type="password"
                        placeholder="Enter API key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Version</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>v1.0</option>
                        <option>v1.1</option>
                        <option>v2.0</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit</label>
                      <input
                        type="text"
                        defaultValue="1000/hour"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeout</label>
                      <input
                        type="text"
                        defaultValue="30s"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Maintenance */}
            <Card className="border-gray-200 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-black">System Maintenance</span>
                </CardTitle>
                <CardDescription>System maintenance and backup operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Activity className="w-6 h-6" />
                      <span>Run Diagnostics</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      <span>Backup Now</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Clock className="w-6 h-6" />
                      <span>Schedule Maintenance</span>
                    </div>
                  </Button>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-auto py-4">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-6 h-6" />
                      <span>Security Scan</span>
                    </div>
                  </Button>
                </div>
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
