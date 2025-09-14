import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Sidebar } from './Sidebar';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Video,
  CheckCircle,
  X,
  Plus,
  Edit,
  MapPin,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

interface AppointmentManagementProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function AppointmentManagement({ onNavigate, userType }: AppointmentManagementProps) {
  const [activeSection, setActiveSection] = useState('schedule');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockAppointments = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      date: '2024-01-18',
      time: '09:00 AM',
      duration: 30,
      type: 'Follow-up',
      status: 'Confirmed',
      priority: 'Normal',
      condition: 'Diabetes Management',
      contact: '+1-234-567-8901',
      notes: 'Blood sugar levels review',
      mode: 'In-Person',
      location: 'Clinic Room 1',
      lastVisit: '2024-01-01'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      patientId: 'P002',
      date: '2024-01-18',
      time: '10:30 AM',
      duration: 45,
      type: 'Consultation',
      status: 'Pending',
      priority: 'High',
      condition: 'Cardiac Assessment',
      contact: '+1-234-567-8902',
      notes: 'New patient - chest pain concerns',
      mode: 'Video Call',
      location: 'Telehealth',
      lastVisit: 'First Visit'
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      patientId: 'P003',
      date: '2024-01-18',
      time: '02:00 PM',
      duration: 60,
      type: 'Emergency',
      status: 'Urgent',
      priority: 'Critical',
      condition: 'Chest Pain',
      contact: '+1-234-567-8903',
      notes: 'Emergency booking - needs immediate attention',
      mode: 'In-Person',
      location: 'Emergency Room',
      lastVisit: '2024-01-10'
    },
    {
      id: 4,
      patient: 'Emily Davis',
      patientId: 'P004',
      date: '2024-01-18',
      time: '03:30 PM',
      duration: 30,
      type: 'Routine',
      status: 'Completed',
      priority: 'Normal',
      condition: 'General Checkup',
      contact: '+1-234-567-8904',
      notes: 'Annual health screening',
      mode: 'In-Person',
      location: 'Clinic Room 2',
      lastVisit: '2023-01-15'
    }
  ];

  const mockAvailableSlots = [
    { time: '08:00 AM', available: true },
    { time: '08:30 AM', available: true },
    { time: '09:00 AM', available: false },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: false },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '03:30 PM', available: false },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true }
  ];

  const renderScheduleView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Appointment Management</h1>
        <p className="text-gray-600 mt-1">Manage your appointment schedule and patient bookings</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-black">8</p>
              </div>
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Confirmations</p>
                <p className="text-2xl font-bold text-black">3</p>
              </div>
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent Cases</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Slots</p>
                <p className="text-2xl font-bold text-black">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments by patient name or condition..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                className="rounded-lg"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                className="rounded-lg"
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
              <Button 
                variant={filterStatus === 'urgent' ? 'default' : 'outline'}
                size="sm"
                className="rounded-lg"
                onClick={() => setFilterStatus('urgent')}
              >
                Urgent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-black" />
              Today's Schedule - January 18, 2024
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Appointment
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAppointments
              .filter(apt => 
                (filterStatus === 'all' || 
                 (filterStatus === 'pending' && apt.status === 'Pending') ||
                 (filterStatus === 'urgent' && apt.status === 'Urgent')) &&
                (apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 apt.condition.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900">{appointment.patient}</span>
                        <span className="text-sm text-gray-500">({appointment.patientId})</span>
                        <Badge 
                          variant={
                            appointment.status === 'Urgent' ? 'destructive' : 
                            appointment.status === 'Pending' ? 'outline' : 'default'
                          }
                          className="rounded-lg"
                        >
                          {appointment.status}
                        </Badge>
                        <Badge variant="outline" className="rounded-lg">
                          {appointment.type}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Time: <span className="text-gray-900 font-medium">{appointment.time}</span></p>
                          <p className="text-gray-600">Duration: <span className="text-gray-900">{appointment.duration} mins</span></p>
                          <p className="text-gray-600">Condition: <span className="text-gray-900">{appointment.condition}</span></p>
                        </div>
                        <div>
                          <p className="text-gray-600">Mode: <span className="text-gray-900">{appointment.mode}</span></p>
                          <p className="text-gray-600">Location: <span className="text-gray-900">{appointment.location}</span></p>
                          <p className="text-gray-600">Last Visit: <span className="text-gray-900">{appointment.lastVisit}</span></p>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-sm text-gray-600 mt-2 bg-gray-100 p-2 rounded-lg">{appointment.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {appointment.mode === 'Video Call' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
                        <Video className="w-4 h-4 mr-1" />
                        Join Call
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="rounded-lg"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">Availability Management</h1>
        <p className="text-gray-600 mt-1">Set your available time slots for patient bookings</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Time Slots */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
            <CardDescription>Today - January 18, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {mockAvailableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border text-center text-sm ${
                    slot.available 
                      ? 'border-green-200 bg-green-50 text-green-700' 
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    {slot.time}
                  </div>
                  <p className="text-xs mt-1">
                    {slot.available ? 'Available' : 'Booked'}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex gap-2">
              <Button className="flex-1 bg-black hover:bg-gray-800 text-white rounded-xl">
                Update Availability
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl">
                Block Time Slot
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your schedule efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Emergency Slot
            </Button>
            
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Reschedule All Today
            </Button>
            
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm All Pending
            </Button>
            
            <Button variant="destructive" className="w-full justify-start rounded-xl">
              <X className="w-4 h-4 mr-2" />
              Cancel Appointments
            </Button>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Upcoming Week Summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tomorrow:</span>
                  <span className="font-medium">12 appointments</span>
                </div>
                <div className="flex justify-between">
                  <span>This Week:</span>
                  <span className="font-medium">48 appointments</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Slots:</span>
                  <span className="font-medium text-green-600">25 slots</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAppointmentDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedAppointment(null)}>
          ← Back to Schedule
        </Button>
        <div>
          <h1 className="text-3xl text-gray-900">Appointment Details</h1>
          <p className="text-gray-600">Patient: {selectedAppointment?.patient}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Appointment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Patient</label>
                <p className="font-medium">{selectedAppointment?.patient}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Patient ID</label>
                <p className="font-medium">{selectedAppointment?.patientId}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Date & Time</label>
                <p className="font-medium">{selectedAppointment?.date} at {selectedAppointment?.time}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Duration</label>
                <p className="font-medium">{selectedAppointment?.duration} minutes</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Condition/Reason</label>
              <p className="font-medium">{selectedAppointment?.condition}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Appointment Mode</label>
              <p className="font-medium flex items-center gap-2">
                {selectedAppointment?.mode === 'Video Call' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                {selectedAppointment?.mode} - {selectedAppointment?.location}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Edit className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
            </div>
            
            <Button variant="outline" className="w-full rounded-xl">
              <Phone className="w-4 h-4 mr-2" />
              Call Patient: {selectedAppointment?.contact}
            </Button>
            
            {selectedAppointment?.mode === 'Video Call' && (
              <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl">
                <Video className="w-4 h-4 mr-2" />
                Start Video Consultation
              </Button>
            )}
            
            <Button variant="destructive" className="w-full rounded-xl">
              <X className="w-4 h-4 mr-2" />
              Cancel Appointment
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl md:col-span-2">
          <CardHeader>
            <CardTitle>Appointment Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes about this appointment, patient concerns, or treatment plans..."
              className="min-h-24 rounded-xl"
              defaultValue={selectedAppointment?.notes}
            />
            <Button className="mt-4 bg-black hover:bg-gray-800 text-white rounded-xl">
              Save Notes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedAppointment) {
      return renderAppointmentDetails();
    }
    switch (activeSection) {
      case 'schedule':
        return renderScheduleView();
      case 'availability':
        return renderAvailability();
      default:
        return renderScheduleView();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        userType={userType || 'doctor'}
        activeSection="appointment-management"
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
        onLogout={() => onNavigate('landing')}
      />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <div className="flex gap-2">
            <Button 
              variant={activeSection === 'schedule' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('schedule')}
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Schedule
            </Button>
            <Button 
              variant={activeSection === 'availability' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('availability')}
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Availability
            </Button>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}