import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  RefreshCw,
  Download
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalHospitals: number;
  pendingVerifications: number;
  emergencyCalls: number;
  appointmentsToday: number;
  userGrowthData: { [key: string]: number };
  appointmentTrends: { [key: string]: number };
  emergencyTrends: { [key: string]: number };
  systemPerformance: { [key: string]: number };
  doctorSpecializations: { [key: string]: number };
  hospitalUtilization: { [key: string]: number };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function AnalyticsDashboard() {
  // Mock analytics data for frontend-only implementation
  const analyticsData: AnalyticsData = {
    totalUsers: 1250,
    totalDoctors: 89,
    totalPatients: 980,
    totalHospitals: 45,
    pendingVerifications: 12,
    emergencyCalls: 156,
    appointmentsToday: 23,
    userGrowthData: {
      'Jan 01': 1000, 'Jan 02': 1008, 'Jan 03': 1015, 'Jan 04': 1022, 'Jan 05': 1030,
      'Jan 06': 1038, 'Jan 07': 1045, 'Jan 08': 1053, 'Jan 09': 1060, 'Jan 10': 1068,
      'Jan 11': 1075, 'Jan 12': 1083, 'Jan 13': 1090, 'Jan 14': 1098, 'Jan 15': 1105,
      'Jan 16': 1113, 'Jan 17': 1120, 'Jan 18': 1128, 'Jan 19': 1135, 'Jan 20': 1143,
      'Jan 21': 1150, 'Jan 22': 1158, 'Jan 23': 1165, 'Jan 24': 1173, 'Jan 25': 1180,
      'Jan 26': 1188, 'Jan 27': 1195, 'Jan 28': 1203, 'Jan 29': 1210, 'Jan 30': 1218
    },
    appointmentTrends: {
      'Mon': 18, 'Tue': 22, 'Wed': 25, 'Thu': 20, 'Fri': 28, 'Sat': 15, 'Sun': 12
    },
    emergencyTrends: {
      'Mon': 12, 'Tue': 15, 'Wed': 18, 'Thu': 14, 'Fri': 22, 'Sat': 19, 'Sun': 16
    },
    systemPerformance: {
      uptime: 99.9,
      avgResponseTime: 245.0,
      errorRate: 0.1
    },
    doctorSpecializations: {
      'Cardiology': 15, 'Neurology': 12, 'Pediatrics': 18, 'Orthopedics': 10,
      'Dermatology': 8, 'Gynecology': 14, 'Emergency Medicine': 12
    },
    hospitalUtilization: {
      'General Beds': 320, 'ICU Beds': 85, 'Emergency Beds': 45
    }
  };

  const prepareChartData = (data: { [key: string]: number }) => {
    return Object.entries(data).map(([key, value]) => ({ name: key, value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into platform performance and usage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-blue-500" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Active platform users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-green-500" />
              Appointments Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.appointmentsToday}</div>
            <p className="text-xs text-gray-500">Scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Emergency Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.emergencyCalls}</div>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.systemPerformance.uptime}%</div>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              User Growth Trend
            </CardTitle>
            <CardDescription>User registrations over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={prepareChartData(analyticsData.userGrowthData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Appointment Trends
            </CardTitle>
            <CardDescription>Daily appointment bookings (last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareChartData(analyticsData.appointmentTrends)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Emergency Calls Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Calls Trend
            </CardTitle>
            <CardDescription>Emergency service calls (last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareChartData(analyticsData.emergencyTrends)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Doctor Specializations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Doctor Specializations
            </CardTitle>
            <CardDescription>Distribution of medical specializations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={prepareChartData(analyticsData.doctorSpecializations)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareChartData(analyticsData.doctorSpecializations).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Performance & Hospital Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Performance
            </CardTitle>
            <CardDescription>Current system health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {analyticsData.systemPerformance.uptime}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Response Time</span>
                <Badge variant="secondary">
                  {analyticsData.systemPerformance.avgResponseTime}ms
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Error Rate</span>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {analyticsData.systemPerformance.errorRate}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Hospital Bed Utilization
            </CardTitle>
            <CardDescription>Current bed occupancy across facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={prepareChartData(analyticsData.hospitalUtilization)} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Summary</CardTitle>
          <CardDescription>Key statistics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.totalDoctors}</div>
              <div className="text-sm text-gray-500">Verified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analyticsData.totalPatients}</div>
              <div className="text-sm text-gray-500">Registered Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analyticsData.totalHospitals}</div>
              <div className="text-sm text-gray-500">Partner Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{analyticsData.pendingVerifications}</div>
              <div className="text-sm text-gray-500">Pending Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
