import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Sidebar } from './Sidebar';
import { fetchAppointments, createAppointment, fetchDoctorAppointmentsByDate } from '../utils/api';
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
  Search,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface AppointmentManagementProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | 'admin' | null;
}

export function AppointmentManagement({ onNavigate, userType }: AppointmentManagementProps) {
  const [activeSection, setActiveSection] = useState('schedule');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');
      if (userId && userType) {
        const fetchedAppointments = await fetchAppointments(userId, userType);
        setAppointments(fetchedAppointments);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadAvailableSlots = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      if (userId) {
        const slots = await fetchDoctorAppointmentsByDate(userId, today);
        // Transform to available slots format
        const slotTimes = [
          '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
          '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
          '16:00', '16:30'
        ];
        const availableSlotsData = slotTimes.map(time => {
          const isBooked = slots.some((slot: any) =>
            new Date(slot.appointmentDate).toTimeString().slice(0, 5) === time
          );
          return {
            time: new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
            available: !isBooked
          };
        });
        setAvailableSlots(availableSlotsData);
      }
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    }
  };

  useEffect(() => {
    loadAppointments();
    loadAvailableSlots();
  }, []);

  // Polling for new appointments every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadAppointments();
      loadAvailableSlots();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const renderScheduleView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Appointment Management</h1>
          <p className="text-gray-600 mt-1">Manage your appointment schedule and patient bookings</p>
        </div>
        <Button
          onClick={() => loadAppointments(true)}
          disabled={refreshing}
          variant="outline"
          size="sm"
          className="rounded-xl"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-black">{appointments.length}</p>
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
                <p className="text-2xl font-bold text-black">{appointments.filter(a => a.status === 'Pending').length}</p>
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
                <p className="text-2xl font-bold text-red-600">{appointments.filter(a => a.status === 'Urgent').length}</p>
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
                  <p className="text-2xl font-bold text-black">{availableSlots.filter(slot => slot.available).length}</p>
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
              Today's Schedule - {new Date().toLocaleDateString()}
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Appointment
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">Loading appointments...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments
                .filter((apt: any) =>
                  (filterStatus === 'all' ||
                   (filterStatus === 'pending' && apt.status === 'Pending') ||
                   (filterStatus === 'urgent' && apt.status === 'Urgent')) &&
                  (apt.patient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   apt.condition?.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((appointment: any) => (
                <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {userType === 'patient' && appointment.doctor ? (
                        <img
                          src={appointment.doctor.profileImage || `https://avatar.vercel.sh/${appointment.doctor.name}.png`}
                          alt={appointment.doctor.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {userType === 'patient' ? (
                            <>
                              <span className="font-medium text-gray-900">{appointment.doctor?.name || 'Doctor'}</span>
                              <span className="text-sm text-gray-500">({appointment.doctor?.specialization || 'Specialization'})</span>
                            </>
                          ) : (
                            <>
                              <span className="font-medium text-gray-900">{appointment.patient?.name || 'Patient'}</span>
                              <span className="text-sm text-gray-500">({appointment.patient?.id || 'ID'})</span>
                            </>
                          )}
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
                            Consultation
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Time: <span className="text-gray-900 font-medium">{appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span></p>
                            <p className="text-gray-600">Date: <span className="text-gray-900">{appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'N/A'}</span></p>
                            {userType === 'patient' && appointment.doctor && (
                              <p className="text-gray-600">Hospital: <span className="text-gray-900">{appointment.doctor.hospitalAffiliation || 'N/A'}</span></p>
                            )}
                          </div>
                          <div>
                            {userType === 'patient' && appointment.doctor && (
                              <>
                                <p className="text-gray-600">Experience: <span className="text-gray-900">{appointment.doctor.yearsOfExperience} years</span></p>
                                <p className="text-gray-600">Rating: <span className="text-gray-900">{appointment.doctor.rating} ⭐</span></p>
                              </>
                            )}
                            {userType === 'doctor' && appointment.patient && (
                              <>
                                <p className="text-gray-600">Contact: <span className="text-gray-900">{appointment.patient.phone || 'N/A'}</span></p>
                                <p className="text-gray-600">Email: <span className="text-gray-900">{appointment.patient.email || 'N/A'}</span></p>
                              </>
                            )}
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
              {appointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No appointments found for today.
                </div>
              )}
            </div>
          )}
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
              {availableSlots.map((slot, index) => (
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
          <p className="text-gray-600">
            {userType === 'patient'
              ? `Doctor: ${selectedAppointment?.doctor?.name || 'Doctor'}`
              : `Patient: ${selectedAppointment?.patient?.name || 'Patient'}`
            }
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Appointment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {userType === 'patient' ? (
                <>
                  <div>
                    <label className="text-sm text-gray-600">Doctor</label>
                    <p className="font-medium">{selectedAppointment?.doctor?.name || 'Doctor'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Specialization</label>
                    <p className="font-medium">{selectedAppointment?.doctor?.specialization || 'N/A'}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm text-gray-600">Patient</label>
                    <p className="font-medium">{selectedAppointment?.patient?.name || 'Patient'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Patient ID</label>
                    <p className="font-medium">{selectedAppointment?.patient?.id || 'N/A'}</p>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Date & Time</label>
                <p className="font-medium">{selectedAppointment?.date} at {selectedAppointment?.time}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Duration</label>
                <p className="font-medium">{selectedAppointment?.duration || 30} minutes</p>
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
                {selectedAppointment?.mode || 'In-Person'} - {selectedAppointment?.location || 'Clinic'}
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
              Call Patient: {selectedAppointment?.contact || 'N/A'}
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
        userType={userType === 'admin' ? 'doctor' : (userType || 'doctor')}
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