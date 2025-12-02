import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import {
  ArrowLeft,
  Search,
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Star,
  User,
  Stethoscope,
  CheckCircle,
  Phone,
  MessageSquare,
  Bell,
  Loader2
} from 'lucide-react';
import { fetchDoctors, createAppointment, fetchDoctorAppointmentsByDate } from '../utils/api';
import { Doctor } from './AppDataContext';

interface PatientAppointmentBookingProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | 'admin' | null;
}

export function PatientAppointmentBooking({ onNavigate, userType }: PatientAppointmentBookingProps) {
  const [step, setStep] = useState<'search' | 'doctor' | 'book' | 'confirm'>('search');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState<'online' | 'inperson'>('inperson');
  const [searchSpecialty, setSearchSpecialty] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [bookedAppointments, setBookedAppointments] = useState<string[]>([]); // store booked time slots for selected doctor and date

  useEffect(() => {
    async function loadBookedAppointments() {
      if (selectedDoctor && selectedDate) {
        try {
          const dateStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
          const appointments = await fetchDoctorAppointmentsByDate(selectedDoctor.id, dateStr);
          // Extract booked time slots from appointments
          const bookedSlots = appointments.map((appt: any) => {
            const apptDate = new Date(appt.appointmentDate);
            return apptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          });
          setBookedAppointments(bookedSlots);
        } catch (error) {
          console.error('Error fetching booked appointments:', error);
        }
      } else {
        setBookedAppointments([]);
      }
    }
    loadBookedAppointments();
  }, [selectedDoctor, selectedDate]);
  
  useEffect(() => {
    async function loadDoctors() {
      setLoading(true);
      setError('');
      try {
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
  ];

  const specialties = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics',
    'Gynecology', 'ENT', 'Ophthalmology', 'Psychiatry', 'General Medicine'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = !searchSpecialty || searchSpecialty === 'all' || 
                           (doctor.specialization && doctor.specialization.toLowerCase().includes(searchSpecialty.toLowerCase()));
    const matchesLocation = !searchLocation || 
                          (doctor.hospitalAffiliation && doctor.hospitalAffiliation.toLowerCase().includes(searchLocation.toLowerCase()));
    return matchesSpecialty && matchesLocation;
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep('doctor');
  };

  const handleBookAppointment = () => {
    setStep('book');
  };

  const [reasonForVisit, setReasonForVisit] = useState('');

  const confirmAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
      alert('Please select doctor, date, and time slot');
      return;
    }

    const patientId = localStorage.getItem('userId');
    if (!patientId) {
      alert('You must be logged in to book an appointment. Please log in and try again.');
      onNavigate('login');
      return;
    }

    try {
      // Construct appointmentDate in ISO format combining selectedDate and selectedTimeSlot
      const [time, meridian] = selectedTimeSlot.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (meridian === 'PM' && hours < 12) {
        hours += 12;
      } else if (meridian === 'AM' && hours === 12) {
        hours = 0;
      }
      const appointmentDateObj = new Date(selectedDate);
      appointmentDateObj.setHours(hours, minutes, 0, 0);

      // Format as local ISO string without timezone (e.g., "2024-01-15T10:00:00")
      const year = appointmentDateObj.getFullYear();
      const month = String(appointmentDateObj.getMonth() + 1).padStart(2, '0');
      const day = String(appointmentDateObj.getDate()).padStart(2, '0');
      const localHours = String(appointmentDateObj.getHours()).padStart(2, '0');
      const localMinutes = String(appointmentDateObj.getMinutes()).padStart(2, '0');
      const localDateTime = `${year}-${month}-${day}T${localHours}:${localMinutes}:00`;

      // Prepare appointment data
      const appointmentData = {
        patientId: patientId,
        doctorId: selectedDoctor.id,
        appointmentDate: localDateTime,
        status: 'Confirmed',
        notes: reasonForVisit,
      };

      // Call API to create appointment
      await createAppointment(appointmentData);

      // Update UI to confirmation step
      setStep('confirm');
    } catch (error: any) {
      alert('Failed to book appointment: ' + (error.message || 'Unknown error'));
    }
  };

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-6 mt-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">Appointment Confirmed!</CardTitle>
                <CardDescription>Your appointment has been successfully booked.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDoctor?.photoUrl || `https://avatar.vercel.sh/${selectedDoctor?.fullName}.png`}
                      alt={selectedDoctor?.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-green-800">{selectedDoctor?.fullName}</h3>
                      <p className="text-sm text-green-600">{selectedDoctor?.medicalDegree}</p>
                      <p className="text-sm text-green-600">{selectedDoctor?.hospitalAffiliation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-green-700">
                    <div>
                      <span className="font-medium">Date:</span> {selectedDate?.toDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {selectedTimeSlot}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {consultationType === 'online' ? 'Online Consultation' : 'In-Person Visit'}
                    </div>
                    <div>
                      <span className="font-medium">Fee:</span> ₹{selectedDoctor?.consultationFee || 800}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <h4 className="font-medium text-gray-900">What's next?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Appointment confirmation sent to your phone
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-500" />
                      You'll receive reminders 24h and 1h before appointment
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-500" />
                      Your appointment will appear in the doctor's appointment management system
                    </div>
                    {consultationType === 'online' ? (
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-purple-500" />
                        Video call link will be shared 15 minutes before appointment
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        Please reach the hospital 15 minutes early
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl"
                    onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep('search');
                      setSelectedDoctor(null);
                    }}
                    className="flex-1 rounded-xl"
                  >
                    Book Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'book' && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep('doctor')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doctor Profile
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl text-gray-900">Book Appointment</h1>
            <p className="text-sm sm:text-base text-gray-600">Schedule your consultation with {selectedDoctor.fullName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Booking Form */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Consultation Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant={consultationType === 'inperson' ? 'default' : 'outline'}
                      onClick={() => setConsultationType('inperson')}
                      className="rounded-xl py-4 sm:py-6 text-sm sm:text-base"
                    >
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <div>
                        <div className="font-medium">In-Person</div>
                        <div className="text-xs opacity-80">Visit hospital</div>
                      </div>
                    </Button>
                    {(selectedDoctor as any).onlineConsultation !== false && ( // Assume online is available unless specified
                      <Button
                        variant={consultationType === 'online' ? 'default' : 'outline'}
                        onClick={() => setConsultationType('online')}
                        className="rounded-xl py-4 sm:py-6 text-sm sm:text-base"
                      >
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <div>
                          <div className="font-medium">Online</div>
                          <div className="text-xs opacity-80">Video call</div>
                        </div>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Select Date
                  </label>
                  <div className="border rounded-xl p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date: Date) => date < new Date()}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-3 block">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isBooked = bookedAppointments.includes(slot);
                        return (
                          <Button
                            key={slot}
                            variant={selectedTimeSlot === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => !isBooked && setSelectedTimeSlot(slot)}
                            disabled={isBooked}
                            className={`rounded-lg text-xs sm:text-sm ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {slot}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Reason for Visit (Optional)
                  </label>
                  <Textarea
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                    className="rounded-xl"
                    value={reasonForVisit}
                    onChange={(e) => setReasonForVisit(e.target.value)}
                  />
                </div>

                <Button
                  onClick={confirmAppointment}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl"
                > {/* Placeholder */}
                  Confirm Appointment - ₹{(selectedDoctor as any).consultationFee || 800}
                </Button>
              </CardContent>
            </Card>

            {/* Doctor Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedDoctor.photoUrl || `https://avatar.vercel.sh/${selectedDoctor.fullName}.png`}
                      alt={selectedDoctor.fullName}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">{selectedDoctor.fullName}</h3>
                        {selectedDoctor.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{selectedDoctor.medicalDegree}</p>
                      <p className="text-sm text-gray-600 mb-3">{selectedDoctor.hospitalAffiliation}</p>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedDoctor.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                          <span className="text-sm text-gray-600">({(selectedDoctor as any).reviews || 0} reviews)</span> {/* Placeholder */}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        {selectedDoctor.yearsOfExperience} years experience
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Consultation Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {consultationType === 'online' ? 'Online Consultation' : 'In-Person Consultation'}
                      </span>
                      <span className="text-lg font-medium">₹{(selectedDoctor as any).consultationFee || 800}</span> {/* Placeholder */}
                    </div>
                    <div className="text-xs text-gray-500">
                      * Additional charges may apply for tests or procedures
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Languages Spoken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {((selectedDoctor as any).languages || ['English', 'Hindi']).map((language: string) => ( // Placeholder
                      <Badge key={language} className="bg-blue-100 text-blue-700 border-blue-200">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'doctor' && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep('search')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>

          <Card className="border-0 shadow-lg rounded-xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <img
                  src={selectedDoctor.photoUrl || `https://avatar.vercel.sh/${selectedDoctor.fullName}.png`}
                  alt={selectedDoctor.fullName}
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-medium">{selectedDoctor.fullName}</h1>
                        {selectedDoctor.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verified Doctor
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-gray-600 mb-1">{selectedDoctor.medicalDegree}</p>
                      <p className="text-gray-600 mb-3">{selectedDoctor.hospitalAffiliation}</p>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(selectedDoctor.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="font-medium">{selectedDoctor.rating}</span>
                          <span className="text-gray-600">({selectedDoctor.reviewCount} reviews)</span>
                        </div>
                        <div className="text-gray-600">
                          {selectedDoctor.yearsOfExperience} years experience
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {((selectedDoctor as any).languages || ['English', 'Hindi']).map((language: string) => ( // Placeholder
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-semibold text-primary mb-2">
                        ₹{(selectedDoctor as any).consultationFee || 800} {/* Placeholder */}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        Next available: {(selectedDoctor as any).nextAvailable || 'Today'} {/* Placeholder */}
                      </div>
                      <Button
                        onClick={handleBookAppointment}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-3"
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Consultation Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">In-Person Visit</p>
                    <p className="text-sm text-blue-600">Visit the hospital for consultation</p>
                  </div>
                </div>

                {(selectedDoctor as any).onlineConsultation !== false && ( // Assume online is available unless specified
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Video className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Online Consultation</p>
                      <p className="text-sm text-green-600">Video call from comfort of your home</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Available through hospital</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">In-app messaging available</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Mon-Sat: 9 AM - 6 PM</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl text-gray-900">Book Appointment</h1>
          <p className="text-sm sm:text-base text-gray-600">Find and book appointments with qualified doctors</p>
        </div>

        {/* Search Filters */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Specialty
                </label>
                <Select value={searchSpecialty} onValueChange={setSearchSpecialty}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase()}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Location
                </label>
                <Input
                  placeholder="Enter city or area"
                  className="rounded-xl"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                  <Search className="w-4 h-4 mr-2" />
                  Search Doctors
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctor List */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-900">
            {filteredDoctors.length} Doctors Found
          </h2>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="border-0 shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handleDoctorSelect(doctor)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.photoUrl || `https://avatar.vercel.sh/${doctor.fullName}.png`}
                      alt={doctor.fullName}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">{doctor.fullName}</h3>
                        {doctor.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{doctor.medicalDegree}</p>
                      <p className="text-sm text-gray-600 mb-3">{doctor.hospitalAffiliation}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(doctor.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-sm text-gray-600">({(doctor as any).reviews || 0})</span> {/* Placeholder */}
                        </div>
                        <span className="text-sm text-gray-600">• {doctor.yearsOfExperience} years exp</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold text-primary">₹{(doctor as any).consultationFee || 800}</div> {/* Placeholder */}
                          <div className="text-xs text-gray-600">{(doctor as any).nextAvailable || 'Available Today'}</div> {/* Placeholder */}
                        </div>

                        <div className="flex gap-2">
                          {(doctor as any).onlineConsultation !== false && ( // Assume online is available unless specified
                            <Badge variant="outline" className="text-xs">
                              <Video className="w-3 h-3 mr-1" />
                              Online
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            In-person
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
