import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAppData, Hospital } from './AppDataContext';
import { Separator } from './ui/separator';
import {
  ArrowLeft, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Navigation,
  Clock,
  Bed,
  Heart,
  Users,
  Share,
  CheckCircle,
  MessageCircle,
  Stethoscope,
  Car
} from 'lucide-react';

interface EmergencyServicesProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | 'admin' | null;
}

export function EmergencyServices({ onNavigate, userType }: EmergencyServicesProps) {
  const { hospitals } = useAppData();
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [ambulanceCalled, setAmbulanceCalled] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError(null);
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setUserLocation(null);
      }
    );
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in km
  };

  const formatDistance = (distance: number): string => {
    return distance < 1 ? `${(distance * 1000).toFixed(0)} m` : `${distance.toFixed(1)} km`;
  };

  const calculateEta = (distance: number): string => {
    // Assuming an average speed of 25 km/h in city traffic
    const timeHours = distance / 25;
    const timeMinutes = timeHours * 60;
    return `${Math.round(timeMinutes)} mins`;
  };

  const hospitalsWithDistance = hospitals
    .filter(hospital => hospital && hospital.coordinates) // Filter out hospitals without coordinates to prevent crashes
    .map(hospital => {
      const distanceInKm = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, hospital.coordinates.lat, hospital.coordinates.lng) : -1;
      return {
        ...hospital,
        distanceInKm,
        displayDistance: distanceInKm !== -1 ? formatDistance(distanceInKm) : 'Calculating...',
        eta: distanceInKm !== -1 ? calculateEta(distanceInKm) : 'N/A',
      };
    })
    .sort((a, b) => {
      // Push hospitals with uncalculated distances to the end of the list
      if (a.distanceInKm === -1 && b.distanceInKm === -1) return 0;
      if (a.distanceInKm === -1) return 1;
      if (b.distanceInKm === -1) return -1;
      return a.distanceInKm - b.distanceInKm;
    });

  const emergencyInstructions = [
    {
      condition: 'Heart Attack',
      steps: [
        'Call ambulance immediately (108)',
        'Have person sit down and rest',
        'Loosen tight clothing',
        'Give aspirin if not allergic',
        'Stay calm and keep talking to person'
      ]
    },
    {
      condition: 'Stroke',
      steps: [
        'Call ambulance immediately',
        'Note the time symptoms started',
        'Keep person lying down with head slightly elevated',
        'Do not give food or water',
        'Monitor breathing and pulse'
      ]
    },
    {
      condition: 'Unconscious Person',
      steps: [
        'Check for responsiveness',
        'Call ambulance (108)',
        'Check breathing and pulse',
        'Place in recovery position if breathing',
        'Start CPR if not breathing'
      ]
    },
    {
      condition: 'Severe Bleeding',
      steps: [
        'Apply direct pressure to wound',
        'Elevate injured area above heart',
        'Call ambulance if bleeding severe',
        'Do not remove embedded objects',
        'Cover with clean cloth'
      ]
    }
  ];

  const activateEmergency = () => {
    setEmergencyActive(true);
  };

  const callAmbulance = () => {
    setAmbulanceCalled(true);
    // In real implementation, this would call 108 or private ambulance
    alert('Ambulance called! ETA: 15 minutes. Emergency contact notified.');
  };

  const shareLocation = () => {
    // In real implementation, this would share live location with family/hospital
    alert('Location shared with emergency contacts and selected hospital.');
  };

  const navigateToHospital = (hospital: Hospital) => {
    if (hospital.coordinates) {
      const destinationStr = `${hospital.coordinates.lat},${hospital.coordinates.lng}`;
      // This URL will open Google Maps and start navigation from the user's current location.
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationStr}&travelmode=driving`;
      window.location.href = mapsUrl;
    } else {
      alert('Hospital location data is not available.');
    }
  };

  const handleBackToDashboard = () => {
    const dashboardPage = userType ? `${userType}-dashboard` : 'landing';
    onNavigate(dashboardPage);
  };

  if (!emergencyActive) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBackToDashboard}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl text-gray-900">Emergency Services</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get immediate help in medical emergencies with AI-guided assistance and hospital routing
              </p>
            </div>

            {/* Emergency SOS Button */}
            <Card className="max-w-md mx-auto border-2 border-red-200 bg-red-50">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl text-red-700">Medical Emergency?</h2>
                  <p className="text-red-600">
                    Press the button below for immediate assistance
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white w-full py-4 text-lg"
                  onClick={activateEmergency}
                >
                  🚨 EMERGENCY SOS
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Emergency Instructions */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Emergency First Aid Guide
                </CardTitle>
                <CardDescription>
                  Quick reference for common medical emergencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {emergencyInstructions.map((instruction, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-medium text-gray-900">{instruction.condition}</h3>
                    <ul className="space-y-1">
                      {instruction.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-primary font-medium">{stepIndex + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                    {index < emergencyInstructions.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Quick Emergency Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 rounded-xl py-6"
                    onClick={() => window.open('tel:108')}
                  >
                    <Phone className="w-5 h-5 text-red-500" />
                    <div className="text-left">
                      <div className="font-medium">Call Ambulance</div>
                      <div className="text-sm text-gray-600">Dial 108 - National Emergency</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 rounded-xl py-6"
                    onClick={() => onNavigate('hospital-finder')}
                  >
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                      <div className="font-medium">Find Nearest Hospital</div>
                      <div className="text-sm text-gray-600">With real-time bed availability</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 rounded-xl py-6"
                    onClick={() => alert('Connecting to emergency doctor...')}
                  >
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <div className="text-left">
                      <div className="font-medium">Emergency Doctor Chat</div>
                      <div className="text-sm text-gray-600">24/7 medical guidance</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 rounded-xl py-6"
                    onClick={() => onNavigate('pickup-service')}
                  >
                    <Car className="w-5 h-5 text-purple-500" />
                    <div className="text-left">
                      <div className="font-medium">Emergency Pickup</div>
                      <div className="text-sm text-gray-600">Assisted transport to hospital</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Remember</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-blue-700">
                  <p className="text-sm">• In life-threatening emergencies, call 108 immediately</p>
                  <p className="text-sm">• Stay calm and follow first aid instructions</p>
                  <p className="text-sm">• Have emergency contacts readily available</p>
                  <p className="text-sm">• Keep important medical information updated</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Emergency Header */}
        <div className="bg-red-500 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-semibold">EMERGENCY ACTIVATED</h1>
                <p className="text-red-100">Finding best route to nearest hospital...</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-red-100">Emergency Services</p>
              <p className="text-lg font-medium">108 Available</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Emergency Actions */}
          <Card className="lg:col-span-1 border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-red-700">Immediate Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className={`w-full py-4 ${ambulanceCalled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-xl`}
                onClick={callAmbulance}
                disabled={ambulanceCalled}
              >
                {ambulanceCalled ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Ambulance Called - ETA 15 min
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Ambulance (108)
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                className="w-full py-4 rounded-xl border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={shareLocation}
              >
                <Share className="w-5 h-5 mr-2" />
                Share Location
              </Button>

              <Button 
                variant="outline" 
                className="w-full py-4 rounded-xl border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => alert('Connecting to emergency doctor...')}
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Emergency Doctor
              </Button>

              <Separator />

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Current Location</p>
                <p className="text-sm text-gray-900 font-medium">📍 Bangalore, Karnataka</p>
                <p className="text-xs text-gray-500">Location shared with emergency services</p>
              </div>
            </CardContent>
          </Card>

          {/* Hospital Options */}
          <Card className="lg:col-span-2 border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Nearest Hospitals with Bed Availability
              </CardTitle>
              <CardDescription>
                Real-time data with traffic conditions and estimated arrival times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hospitalsWithDistance.map((hospital, index) => (
                <div
                  key={hospital.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedHospital?.id === hospital.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Recommended
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Navigation className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{hospital.displayDistance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">ETA: {hospital.eta}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="text-lg font-medium text-green-700">{hospital.generalBeds}</div>
                          <div className="text-xs text-green-600">General</div>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <div className="text-lg font-medium text-orange-700">{hospital.icuBeds}</div>
                          <div className="text-xs text-orange-600">ICU</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded-lg">
                          <div className="text-lg font-medium text-red-700">{hospital.emergencyBeds}</div>
                          <div className="text-xs text-red-600">Emergency</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card's onClick from firing again
                          navigateToHospital(hospital);
                        }}
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Navigate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => window.open(`tel:${hospital.phone}`)}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {selectedHospital && (
                <div className="mt-6 p-4 bg-primary/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">
                        Navigation active to {selectedHospital.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        ETA: {selectedHospital.eta} • Distance: {selectedHospital.displayDistance}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setEmergencyActive(false)}
                      className="rounded-lg"
                    >
                      End Emergency
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}