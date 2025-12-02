import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Home, 
  Heart, 
  Activity, 
  TestTube, 
  Clock,
  MapPin,
  Phone,
  Calendar as CalendarIcon,
  User,
  CheckCircle,
  Truck,
  Star,
  MessageCircle
} from 'lucide-react';

interface HomeServicesProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | 'admin' | null;
}

export function HomeServices({ onNavigate, userType }: HomeServicesProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [bookingStep, setBookingStep] = useState<'select' | 'book' | 'tracking'>('select');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [technicianLocation, setTechnicianLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (bookingStep === 'tracking') {
      navigator.geolocation.getCurrentPosition(position => {
        const uLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(uLocation);
        setTechnicianLocation({
          lat: uLocation.lat + 0.02,
          lng: uLocation.lng + 0.02,
        });
      });
    }
  }, [bookingStep]);

  const services = [
    {
      id: 'blood-sample',
      name: 'Home Blood Sample Collection',
      description: 'Professional phlebotomist visits your home to collect blood samples',
      price: '₹299',
      duration: '15-20 mins',
      icon: TestTube,
      features: [
        'Certified phlebotomist',
        'Sterile equipment',
        'Reports in 24 hours',
        'Direct upload to app'
      ],
      availableTests: [
        'Complete Blood Count (CBC)',
        'Blood Sugar (Fasting)',
        'Lipid Profile',
        'Thyroid Function',
        'Liver Function Test',
        'Kidney Function Test'
      ]
    },
    {
      id: 'home-ecg',
      name: 'Home ECG Service',
      description: 'Portable ECG machine with trained technician for heart monitoring',
      price: '₹599',
      duration: '20-30 mins',
      icon: Heart,
      features: [
        'Portable ECG machine',
        'Trained cardiac technician',
        'Instant results',
        'Cardiologist review'
      ],
      availableTests: [
        '12-Lead ECG',
        'Rhythm monitoring',
        'Emergency ECG',
        'Follow-up ECG'
      ]
    },
    {
      id: 'ultrasound',
      name: 'Home Ultrasound Scan',
      description: 'Portable ultrasound with qualified radiologist for basic scans',
      price: '₹1,299',
      duration: '30-45 mins',
      icon: Activity,
      features: [
        'Portable ultrasound device',
        'Qualified sonographer',
        'Immediate imaging',
        'Radiologist report'
      ],
      availableTests: [
        'Abdominal ultrasound',
        'Pelvic ultrasound',
        'Thyroid scan',
        'Pregnancy scan (basic)'
      ]
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const mockTechnician = {
    name: 'Anil Kumar',
    phone: '+91 98765 43210',
    vehicle: 'Honda Activa - KA 02 XY 5678',
    eta: '12 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&crop=face'
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setBookingStep('book');
  };

  const handleBooking = () => {
    setBookingStep('tracking');
  };

  if (bookingStep === 'tracking') {
    // --- DEBUGGING ---
    // After booking a home service, open your browser's developer console (F12) 
    // to see these logs. This will help diagnose the environment variable issue.
    console.log("Vite Environment Variables:", import.meta.env);
    console.log("Google Maps API Key Loaded:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
    // --- END DEBUGGING ---
    const service = services.find(s => s.id === selectedService);
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Read from environment
    const mapSrc = userLocation && technicianLocation
      ? `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}&origin=${technicianLocation.lat},${technicianLocation.lng}&destination=${userLocation.lat},${userLocation.lng}&mode=driving`
      : '';

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
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
          <div className="text-center">
            <h1 className="text-3xl text-gray-900">Booking Confirmed & Technician En Route</h1>
            <p className="text-gray-600">Your {service?.name} is on its way.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg rounded-xl h-full">
                <CardContent className="p-2 h-full">
                  {!googleMapsApiKey ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg p-4">
                      <div className="text-center p-8 bg-white rounded-lg shadow-inner max-w-md">
                        <h2 className="text-xl font-bold text-red-600 mb-2">Map Configuration Needed</h2>
                        <p className="text-gray-700">To display the tracking map, you need to provide a Google Maps API key in your environment file.</p>
                        <p className="text-sm text-gray-500 mt-4">Create a <code className="bg-gray-200 p-1 rounded text-xs">.env.local</code> file in the project root and add <code className="bg-gray-200 p-1 rounded text-xs">VITE_GOOGLE_MAPS_API_KEY="YOUR_KEY"</code>.</p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full rounded-lg"
                      style={{ border: 0, minHeight: '400px' }}
                      loading="lazy"
                      allowFullScreen
                      src={mapSrc}
                    ></iframe>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Technician Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={mockTechnician.image} alt={mockTechnician.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="font-medium">{mockTechnician.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="w-4 h-4 fill-current" /> {mockTechnician.rating}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{mockTechnician.vehicle}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl">
                      <MessageCircle className="w-4 h-4 mr-2" /> Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Live Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Booking Confirmed</p>
                      <p className="text-sm text-gray-500">{selectedTimeSlot}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Technician Assigned</p>
                      <p className="text-sm text-gray-500">{mockTechnician.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-blue-500 animate-pulse" />
                    <div>
                      <p className="font-medium">Technician En Route</p>
                      <p className="text-sm text-gray-500">ETA: {mockTechnician.eta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <Home className="w-5 h-5" />
                    <p className="font-medium">Arrived</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStep === 'book' && selectedService) { // This is the booking form
    const service = services.find(s => s.id === selectedService);
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setBookingStep('select')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl text-gray-900">Book {service?.name}</h1>
            <p className="text-gray-600">Schedule your home service appointment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Select your preferred date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    Select Time Slot
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

                {selectedService === 'blood-sample' && (
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-3 block">
                      Select Tests
                    </label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose test package" />
                      </SelectTrigger>
                      <SelectContent>
                        {service.availableTests.map((test) => (
                          <SelectItem key={test} value={test.toLowerCase()}>
                            {test}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Address
                  </label>
                  <Textarea
                    placeholder="Enter your complete address for service..."
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Contact Number
                  </label>
                  <Input
                    placeholder="Enter your mobile number"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Special Instructions (Optional)
                  </label>
                  <Textarea
                    placeholder="Any special requirements or medical conditions we should know..."
                    className="rounded-xl"
                  />
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl"
                >
                  Confirm Booking - {service?.price}
                </Button>
              </CardContent>
            </Card>

            {/* Service Details */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <service.icon className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-2xl font-medium text-primary">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.availableTests && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Available Tests:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.availableTests.map((test, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {test}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Important Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-blue-700 text-sm">
                  <p>• Our technician will arrive within ±15 minutes of scheduled time</p>
                  <p>• Please have your ID ready for verification</p>
                  <p>• For blood tests, fasting may be required (we'll confirm)</p>
                  <p>• Reports will be uploaded directly to your app</p>
                  <p>• Rescheduling available up to 4 hours before appointment</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : userType === 'doctor' ? 'doctor-dashboard' : 'admin-dashboard')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl text-gray-900">Home Healthcare Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional healthcare services delivered to your home. Convenient, safe, and reliable.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            Available in Bangalore, Mumbai, Delhi, Hyderabad, Chennai
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="border-0 shadow-lg rounded-xl hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleServiceSelect(service.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Home Service
                  </Badge>
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  </div>
                  <span className="text-2xl font-semibold text-primary">{service.price}</span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">What's Included:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="border-0 shadow-lg rounded-xl mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>Simple 4-step process to get healthcare at your doorstep</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CalendarIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium">1. Book Service</h3>
                <p className="text-sm text-gray-600">Select service, date and time that works for you</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-medium">2. Confirmation Call</h3>
                <p className="text-sm text-gray-600">Our team calls to confirm your appointment</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium">3. Home Visit</h3>
                <p className="text-sm text-gray-600">Qualified professional arrives at your home</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium">4. Get Reports</h3>
                <p className="text-sm text-gray-600">Reports uploaded directly to your app</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="border-0 shadow-lg rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Why Choose Home Services?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">No waiting in long hospital queues</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Comfortable and familiar environment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Qualified and certified professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Safe for elderly and mobility-limited patients</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-green-800">Safety & Quality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">All equipment sterilized and certified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Licensed healthcare professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Digital reports with doctor validation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Secure data handling and privacy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}