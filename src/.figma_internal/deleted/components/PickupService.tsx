import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Car, 
  Clock,
  MapPin,
  User,
  Phone,
  Calendar as CalendarIcon,
  CheckCircle,
  Heart,
  Shield,
  Users,
  Star,
  MessageCircle
} from 'lucide-react';

interface PickupServiceProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function PickupService({ onNavigate, userType }: PickupServiceProps) {
  const [step, setStep] = useState<'select' | 'book' | 'confirm'>('select');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');

  const services = [
    {
      id: 'elderly-assistance',
      name: 'Elderly Assistance Service',
      description: 'Dedicated support for elderly patients with mobility assistance and care',
      price: 899,
      duration: '3-4 hours',
      icon: Heart,
      features: [
        'Trained healthcare companion',
        'Wheelchair assistance if needed',
        'Help with registration & paperwork',
        'Medicine management support',
        'Comfortable transport vehicle'
      ],
      suitableFor: ['Age 60+ patients', 'Mobility challenges', 'Regular checkups', 'Chronic conditions']
    },
    {
      id: 'disability-support',
      name: 'Disability Support Service',
      description: 'Comprehensive assistance for patients with physical disabilities',
      price: 1199,
      duration: '4-5 hours',
      icon: Shield,
      features: [
        'Certified disability care assistant',
        'Specialized transport vehicle',
        'Medical equipment transport',
        'Complete hospital navigation',
        'Communication assistance'
      ],
      suitableFor: ['Physical disabilities', 'Visual/hearing impaired', 'Neurological conditions', 'Post-surgery care']
    },
    {
      id: 'family-support',
      name: 'Family Support Service',
      description: 'When family members cannot accompany patients to appointments',
      price: 699,
      duration: '2-3 hours',
      icon: Users,
      features: [
        'Healthcare companion',
        'Real-time updates to family',
        'Doctor consultation notes',
        'Prescription collection',
        'Emergency contact support'
      ],
      suitableFor: ['Working family members', 'Solo patients', 'Emergency situations', 'Regular treatments']
    }
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const mockTestimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 67,
      service: 'Elderly Assistance',
      rating: 5,
      comment: 'The companion was very patient and helpful. Made my hospital visit so much easier.',
      location: 'Bangalore'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 45,
      service: 'Disability Support',
      rating: 5,
      comment: 'Excellent service for my father who uses a wheelchair. Very professional and caring.',
      location: 'Mumbai'
    },
    {
      id: 3,
      name: 'Amit Patel',
      age: 52,
      service: 'Family Support',
      rating: 4,
      comment: 'Great help when I had to travel for work and my mother had her appointment.',
      location: 'Delhi'
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep('book');
  };

  const handleBooking = () => {
    setStep('confirm');
  };

  const confirmBooking = () => {
    alert('Pickup service booked successfully! Our team will call you within 30 minutes to confirm details.');
    setStep('select');
    setSelectedService('');
  };

  if (step === 'confirm') {
    const service = services.find(s => s.id === selectedService);
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-6 mt-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">Service Booked Successfully!</CardTitle>
                <CardDescription>Your pickup service has been confirmed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-medium text-green-800">{service?.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                    <div>
                      <span className="font-medium">Date:</span> {selectedDate?.toDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {selectedTimeSlot}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {service?.duration}
                    </div>
                    <div>
                      <span className="font-medium">Cost:</span> ₹{service?.price}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-green-800">Pickup Address:</span>
                      <p className="text-sm text-green-700">{pickupAddress}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">Hospital:</span>
                      <p className="text-sm text-green-700">{hospitalAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <h4 className="font-medium text-gray-900">What happens next?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Our team will call you within 30 minutes to confirm
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-blue-500" />
                      Healthcare companion will arrive 15 minutes before scheduled time
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      Live tracking available during service
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-orange-500" />
                      Regular updates sent to family members
                    </div>
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
                      setStep('select');
                      setSelectedService('');
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

  if (step === 'book' && selectedService) {
    const service = services.find(s => s.id === selectedService);
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setStep('select')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl text-gray-900">Book {service?.name}</h1>
            <p className="text-gray-600">Schedule your assisted healthcare visit</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
                <CardDescription>Provide information for your pickup service</CardDescription>
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
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
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
                    Pickup Address
                  </label>
                  <Textarea
                    placeholder="Enter complete pickup address including landmark..."
                    className="rounded-xl"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Hospital/Clinic Address
                  </label>
                  <Textarea
                    placeholder="Enter hospital or clinic address..."
                    className="rounded-xl"
                    value={hospitalAddress}
                    onChange={(e) => setHospitalAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Patient Contact Number
                  </label>
                  <Input
                    placeholder="Enter mobile number"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Emergency Contact
                  </label>
                  <Input
                    placeholder="Family member contact number"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-3 block">
                    Special Requirements (Optional)
                  </label>
                  <Textarea
                    placeholder="Any medical conditions, mobility aids needed, or special instructions..."
                    className="rounded-xl"
                  />
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTimeSlot || !pickupAddress || !hospitalAddress}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl"
                >
                  Confirm Booking - ₹{service?.price}
                </Button>
              </CardContent>
            </Card>

            {/* Service Summary */}
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
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="text-2xl font-medium text-primary">₹{service.price}</span>
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

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Suitable For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.suitableFor.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Service Promise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-blue-700 text-sm">
                  <p>• Trained and verified healthcare companions</p>
                  <p>• Real-time updates to family members</p>
                  <p>• Complete assistance from pickup to drop-off</p>
                  <p>• Insurance for all services</p>
                  <p>• 24/7 emergency support hotline</p>
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
            onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl text-gray-900">Patient Pickup & Assistance Service</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional healthcare companions to assist you or your loved ones with hospital visits
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            Available in major cities across India
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
                    Verified Service
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
                  <span className="text-2xl font-semibold text-primary">₹{service.price}</span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">What's Included:</h4>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {service.features.length > 3 && (
                    <p className="text-xs text-gray-500 mt-1">+{service.features.length - 3} more features</p>
                  )}
                </div>

                <Button 
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
                >
                  Book Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="border-0 shadow-lg rounded-xl mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How Our Service Works</CardTitle>
            <CardDescription>Simple process to get professional healthcare assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CalendarIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium">1. Book Service</h3>
                <p className="text-sm text-gray-600">Choose service type, date and time</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-medium">2. Confirmation Call</h3>
                <p className="text-sm text-gray-600">Our team confirms all details with you</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium">3. Companion Arrives</h3>
                <p className="text-sm text-gray-600">Healthcare companion picks you up</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium">4. Complete Care</h3>
                <p className="text-sm text-gray-600">Full assistance until safe return home</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What Our Patients Say</CardTitle>
            <CardDescription>Real experiences from families who used our service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {mockTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{testimonial.name}, {testimonial.age}</div>
                    <div className="text-gray-600">{testimonial.service} • {testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="border-0 shadow-lg rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-green-800">Why Choose Our Service?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Trained healthcare professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Complete assistance from home to hospital</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Real-time family updates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Insurance covered for peace of mind</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Perfect For</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Elderly patients living alone</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Patients with mobility challenges</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">When family cannot accompany</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">Patients needing emotional support</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}