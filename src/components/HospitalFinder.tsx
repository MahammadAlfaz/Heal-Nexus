import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useAppData } from './AppDataContext';
import {
  ArrowLeft,
  Search,
  MapPin,
  Navigation,
  Phone,
  Clock,
  Bed,
  Star,
  Filter,
  CreditCard,
  Stethoscope,
  Shield,
  CheckCircle,
  Heart,
  Brain,
  Eye,
  Bone
} from 'lucide-react';

interface HospitalFinderProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | 'admin' | null;
}

export function HospitalFinder({ onNavigate, userType }: HospitalFinderProps) {
  const { hospitals } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedHealthCard, setSelectedHealthCard] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    emergency: false,
    insurance: false,
    parking: false,
    pharmacy: false
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
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

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): string => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1 ? `${(distance * 1000).toFixed(0)} m` : `${distance.toFixed(1)} km`;
  };

  const getHospitalDistance = (hospital: any): string => {
    if (!userLocation) return hospital.distance;
    return calculateDistance(userLocation.lat, userLocation.lng, hospital.coordinates.lat, hospital.coordinates.lng);
  };



  const specialties = [
    { name: 'Cardiology', icon: Heart },
    { name: 'Neurology', icon: Brain },
    { name: 'Ophthalmology', icon: Eye },
    { name: 'Orthopedics', icon: Bone },
    { name: 'General Medicine', icon: Stethoscope },
    { name: 'Pediatrics', icon: Heart },
    { name: 'Dermatology', icon: Shield },
    { name: 'ENT', icon: Stethoscope }
  ];

  const healthCards = [
    'ABHA (Ayushman Bharat Health Account)',
    'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    'CGHS (Central Government Health Scheme)',
    'ESI (Employee State Insurance)',
    'State Government Health Insurance',
    'Private Health Insurance'
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === 'all' ||
                           hospital.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  const callHospital = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const getDirections = (hospitalAddress: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospitalAddress)}`;
    window.open(url, '_blank');
  };

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
          <h1 className="text-3xl text-gray-900">Find Hospitals</h1>
          <p className="text-gray-600">
            Find hospitals with real-time bed availability and health card acceptance
          </p>
          {locationError && (
            <p className="text-red-600 text-sm">{locationError}</p>
          )}
          {!userLocation && !locationError && (
            <p className="text-blue-600 text-sm">Getting your location for accurate distances...</p>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search hospitals by name or location..."
                    className="pl-10 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-xl"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Specialty
                    </label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Any specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any specialty</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.name} value={specialty.name.toLowerCase()}>
                            {specialty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Health Card
                    </label>
                    <Select value={selectedHealthCard} onValueChange={setSelectedHealthCard}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select health card" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any card accepted</SelectItem>
                        {healthCards.map((card) => (
                          <SelectItem key={card} value={card.toLowerCase()}>
                            {card}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Facilities
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emergency"
                          checked={selectedFilters.emergency}
                          onCheckedChange={(checked: boolean | "indeterminate") =>
                            setSelectedFilters(prev => ({...prev, emergency: !!checked}))
                          }
                        />
                        <label htmlFor="emergency" className="text-sm">24x7 Emergency</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="parking"
                          checked={selectedFilters.parking}
                          onCheckedChange={(checked: boolean | "indeterminate") =>
                            setSelectedFilters(prev => ({...prev, parking: !!checked}))
                          }
                        />
                        <label htmlFor="parking" className="text-sm">Parking Available</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hospital List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-gray-900">
                {filteredHospitals.length} Hospitals Found
              </h2>
              <Select defaultValue="distance">
                <SelectTrigger className="w-48 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="beds">Sort by Bed Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="flex">
                  <div className="w-32 h-32 bg-gray-200">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-gray-900">{hospital.name}</h3>
                          {hospital.verified && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {hospital.address}
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="w-4 h-4" />
                            {getHospitalDistance(hospital)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(hospital.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm font-medium">{hospital.rating}</span>
                            <span className="text-sm text-gray-600">({hospital.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <Button
                          size="sm"
                          onClick={() => getDirections(hospital.address)}
                          className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => callHospital(hospital.phone)}
                          className="rounded-lg"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>

                    {/* Bed Availability */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-2 bg-green-50 rounded-lg">
                        <div className="text-lg font-medium text-green-700">{hospital.generalBeds}</div>
                        <div className="text-xs text-green-600">General Beds</div>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded-lg">
                        <div className="text-lg font-medium text-orange-700">{hospital.icuBeds}</div>
                        <div className="text-xs text-orange-600">ICU Beds</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded-lg">
                        <div className="text-lg font-medium text-red-700">{hospital.emergencyBeds}</div>
                        <div className="text-xs text-red-600">Emergency</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Health Cards */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        Accepted Health Cards
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.healthCards.map((card) => (
                          <Badge key={card} className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                            {card}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Facilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.facilities.map((facility) => (
                          <Badge key={facility} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => onNavigate('emergency-services')}
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  Emergency (108)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => onNavigate('appointment-booking')}
                >
                  <Clock className="w-4 h-4 text-blue-500" />
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => onNavigate('cost-estimator')}
                >
                  <CreditCard className="w-4 h-4 text-green-500" />
                  Cost Estimator
                </Button>
              </CardContent>
            </Card>

            {/* Popular Specialties */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Popular Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {specialties.slice(0, 8).map((specialty) => (
                    <Button
                      key={specialty.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSpecialty(specialty.name.toLowerCase())}
                      className="justify-start gap-2 rounded-lg"
                    >
                      <specialty.icon className="w-4 h-4" />
                      {specialty.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Card Guide */}
            <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Health Card Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-blue-700">
                <p className="text-sm">• Check hospital acceptance before visiting</p>
                <p className="text-sm">• Save up to 80% on treatment costs</p>
                <p className="text-sm">• Cashless treatment at empaneled hospitals</p>
                <p className="text-sm">• Coverage for family members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
