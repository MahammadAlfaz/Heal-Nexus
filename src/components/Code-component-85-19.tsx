import { useState } from 'react';
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
  Bell
} from 'lucide-react';

interface AppointmentBookingProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function AppointmentBooking({ onNavigate, userType }: AppointmentBookingProps) {
  const [step, setStep] = useState<'search' | 'doctor' | 'book' | 'confirm'>('search');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState<'online' | 'inperson'>('inperson');
  const [searchSpecialty, setSearchSpecialty] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      qualification: 'MD, DM Cardiology',
      yearsOfExperience: 15,
      rating: 4.8,
      reviews: 342,
      hospital: 'Apollo Hospitals',
      location: 'Bangalore',
      consultationFee: 800,
      nextAvailable: 'Today 4:00 PM',
      languages: ['English', 'Hindi', 'Kannada'],
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      verified: true,
      onlineConsultation: true
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Neurologist',
      qualification: 'MD, DM Neurology',
      yearsOfExperience: 12,
      rating: 4.9,
      reviews: 298,
      hospital: 'Manipal Hospital',
      location: 'Bangalore',
      consultationFee: 1000,
      nextAvailable: 'Tomorrow 10:30 AM',
      languages: ['English', 'Hindi'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      verified: true,
      onlineConsultation: true
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialty: 'Orthopedist',
      qualification: 'MS Orthopedics',
      yearsOfExperience: 18,
      rating: 4.7,
      reviews: 451,
      hospital: 'Fortis Hospital',
      location: 'Bangalore',
      consultationFee: 700,
      nextAvailable: 'Tomorrow 2:00 PM',
      languages: ['English', 'Gujarati', 'Hindi'],
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      verified: true,
      onlineConsultation: false
    }
  ];

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
                           doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase());
    const matchesLocation = !searchLocation || 
                          doctor.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesSpecialty && matchesLocation;
  });

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep('doctor');
  };

  const handleBookAppointment = () => {
    setStep('book');
  };

  const confirmAppointment = () => {
    setStep('confirm');
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
                <CardDescription>Your appointment has been successfully booked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDoctor?.image}
                      alt={selectedDoctor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-green-800">{selectedDoctor?.name}</h3>
                      <p className="text-sm text-green-600">{selectedDoctor?.specialty}</p>
                      <p className="text-sm text-green-600">{selectedDoctor?.hospital}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
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
                      <span className="font-medium">Fee:</span> ₹{selectedDoctor?.consultationFee}
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
            <h1 className="text-3xl text-gray-900">Book Appointment</h1>
            <p className="text-gray-600">Schedule your consultation with {selectedDoctor.name}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
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
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={consultationType === 'inperson' ? 'default' : 'outline'}
                      onClick={() => setConsultationType('inperson')}
                      className="rounded-xl py-6"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      <div>
                        <div>In-Person</div>
                        <div className="text-xs opacity-80">Visit hospital</div>
                      </div>
                    </Button>
                    {selectedDoctor.onlineConsultation && (
                      <Button
                        variant={consultationType === 'online' ? 'default' : 'outline'}
                        onClick={() => setConsultationType('online')}
                        className="rounded-xl py-6"
                      >
                        <Video className="w-5 h-5 mr-2" />
                        <div>
                          <div>Online</div>
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
                      disabled={(date) => date < new Date()}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTimeSlot === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className="rounded-lg"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Reason for Visit (Optional)
                  </label>
                  <Textarea
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                    className="rounded-xl"
                  />
                </div>

                <Button
                  onClick={confirmAppointment}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl"
                >
                  Confirm Appointment - ₹{selectedDoctor.consultationFee}
                </Button>
              </CardContent>
            </Card>

            {/* Doctor Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">{selectedDoctor.name}</h3>
                        {selectedDoctor.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{selectedDoctor.specialty}</p>
                      <p className="text-sm text-gray-600 mb-2">{selectedDoctor.qualification}</p>
                      <p className="text-sm text-gray-600 mb-3">{selectedDoctor.hospital}</p>
                      
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
                          <span className="text-sm text-gray-600">({selectedDoctor.reviews} reviews)</span>
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
                      <span className="text-lg font-medium">₹{selectedDoctor.consultationFee}</span>
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
                    {selectedDoctor.languages.map((language: string) => (
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
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-medium">{selectedDoctor.name}</h1>
                        {selectedDoctor.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verified Doctor
                          </Badge>
                        )}
                      </div>
                      <p className="text-lg text-gray-600 mb-1">{selectedDoctor.specialty}</p>
                      <p className="text-gray-600 mb-2">{selectedDoctor.qualification}</p>
                      <p className="text-gray-600 mb-3">{selectedDoctor.hospital}, {selectedDoctor.location}</p>
                      
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
                          <span className="text-gray-600">({selectedDoctor.reviews} reviews)</span>
                        </div>
                        <div className="text-gray-600">
                          {selectedDoctor.yearsOfExperience} years experience
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedDoctor.languages.map((language: string) => (
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-primary mb-2">
                        ₹{selectedDoctor.consultationFee}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        Next available: {selectedDoctor.nextAvailable}
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

          <div className="grid md:grid-cols-2 gap-6">
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
                
                {selectedDoctor.onlineConsultation && (
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
          <h1 className="text-3xl text-gray-900">Book Appointment</h1>
          <p className="text-gray-600">Find and book appointments with qualified doctors</p>
        </div>

        {/* Search Filters */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
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
          
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card 
                key={doctor.id} 
                className="border-0 shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handleDoctorSelect(doctor)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">{doctor.name}</h3>
                        {doctor.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                      <p className="text-sm text-gray-600 mb-2">{doctor.qualification}</p>
                      <p className="text-sm text-gray-600 mb-3">{doctor.hospital}</p>
                      
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
                          <span className="text-sm text-gray-600">({doctor.reviews})</span>
                        </div>
                        <span className="text-sm text-gray-600">• {doctor.yearsOfExperience} years exp</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold text-primary">₹{doctor.consultationFee}</div>
                          <div className="text-xs text-gray-600">{doctor.nextAvailable}</div>
                        </div>
                        
                        <div className="flex gap-2">
                          {doctor.onlineConsultation && (
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