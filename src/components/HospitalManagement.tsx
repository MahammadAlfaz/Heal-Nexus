import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input'; // Assuming Hospital is defined here or imported
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAppData, Hospital } from './AppDataContext'; // The context provides local state management
import {
  fetchHospitals,
  createHospital as apiCreateHospital, // Rename imports to avoid conflicts
  updateHospital as apiUpdateHospital,
  deleteHospital as apiDeleteHospital,
} from '../utils/api';
import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Stethoscope,
  Ambulance
} from 'lucide-react';

interface HospitalManagementProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HospitalManagement({ onNavigate }: HospitalManagementProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Hospital>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    specialties: [],
    emergencyServices: false,
    verified: false,
    healthCards: [],
    facilities: [],
    rating: 0,
    image: '',
    coordinates: { lat: 0, lng: 0 },
    reviewCount: 0,
    generalBeds: 0,
    icuBeds: 0,
    emergencyBeds: 0
  });

  useEffect(() => {
    const loadHospitals = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHospitals();
        setHospitals(data);
      } catch (err) {
        setError('Failed to load hospitals');
        console.error('Error loading hospitals:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHospitals();
  }, []); // Empty dependency array ensures this runs once on mount

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddHospital = async () => {
    if (formData.name && formData.address && formData.phone && formData.email) {
      try {
        const newHospitalData = await apiCreateHospital(formData);
        setHospitals(prev => [...prev, newHospitalData]);
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          specialties: [],
          emergencyServices: false,
          verified: false,
          healthCards: [],
          facilities: [],
          rating: 0,
          image: '',
          coordinates: { lat: 0, lng: 0 },
          reviewCount: 0,
          generalBeds: 0,
          icuBeds: 0,
          emergencyBeds: 0
        });
        setIsAddDialogOpen(false);
      } catch (error) {
        console.error('Failed to add hospital:', error);
        alert('Failed to add hospital. Please try again.');
      }
    }
  };

  const handleEditHospital = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setFormData(hospital);
  };

  const handleUpdateHospital = async () => {
    if (editingHospital && formData.name && formData.address && formData.phone && formData.email) {
      try {
        const updatedHospitalData = await apiUpdateHospital(editingHospital.id, formData);
        setHospitals(prev => prev.map(h => h.id === editingHospital.id ? updatedHospitalData : h));
        setEditingHospital(null);
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          specialties: [],
          emergencyServices: false,
          verified: false,
          healthCards: [],
          facilities: [],
          rating: 0,
          image: '',
          coordinates: { lat: 0, lng: 0 },
          reviewCount: 0,
          generalBeds: 0,
          icuBeds: 0,
          emergencyBeds: 0
        });
      } catch (error) {
        console.error('Failed to update hospital:', error);
        alert('Failed to update hospital. Please try again.');
      }
    }
  };

  const handleDeleteHospital = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await apiDeleteHospital(id);
        setHospitals(prev => prev.filter(h => h.id !== id));
      } catch (error) {
        console.error('Failed to delete hospital:', error);
        alert('Failed to delete hospital. Please try again.');
      }
    }
  };

  const HospitalCard = ({ hospital }: { hospital: Hospital }) => (
    <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">{hospital.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`px-2 py-1 text-xs ${hospital.verified ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                  {hospital.verified ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                  {hospital.verified ? 'Verified' : 'Pending'}
                </Badge>
                {hospital.emergencyServices && (
                  <Badge className="bg-red-50 text-red-600 border-red-200 px-2 py-1 text-xs">
                    <Ambulance className="w-3 h-3 mr-1" />
                    Emergency
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEditHospital(hospital)}
              className="text-gray-600 hover:text-black hover:bg-gray-100"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDeleteHospital(hospital.id)} // Corrected handler
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{hospital.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{hospital.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{hospital.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-600">{hospital.rating} rating</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hospital.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {hospital.specialties.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{hospital.specialties.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{hospital.facilities.length} facilities</span>
            </div>
            <div className="flex items-center gap-1">
              <Stethoscope className="w-4 h-4" />
              <span>{hospital.specialties.length} specialties</span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => navigate('/hospital-details', { state: { hospital } })}
            className="bg-black hover:bg-gray-800 text-white rounded-lg"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-gray-900">Hospital Management</h2>
          <p className="text-gray-600">Manage healthcare facilities and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Hospital
            </Button>
          </DialogTrigger>
        <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-4xl md:max-w-5xl lg:max-w-[95vw] h-[90vh] flex flex-col gap-0 p-0">
          <div className="flex-shrink-0 p-6 border-b">
            <DialogTitle className="text-lg font-semibold">Add New Hospital</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              Enter the complete details of the new healthcare facility
            </DialogDescription>
          </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Hospital Name</label>
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter hospital name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <Textarea
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Image URL</label>
                  <Input
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              {/* Status & Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Status & Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Emergency Services</label>
                    <Select
                      value={formData.emergencyServices ? 'yes' : 'no'}
                      onValueChange={(value: string) => setFormData({ ...formData, emergencyServices: value === 'yes' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Verification Status</label>
                    <Select
                      value={formData.verified ? 'verified' : 'pending'}
                      onValueChange={(value: string) => setFormData({ ...formData, verified: value === 'verified' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rating</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating || 0}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Latitude</label>
                    <Input
                      type="number"
                      step="0.000001"
                      value={formData.coordinates?.lat || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        coordinates: { ...formData.coordinates!, lat: parseFloat(e.target.value) || 0 }
                      })}
                      placeholder="0.000000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Longitude</label>
                    <Input
                      type="number"
                      step="0.000001"
                      value={formData.coordinates?.lng || 0}
                      onChange={(e) => setFormData({
                        ...formData,
                        coordinates: { ...formData.coordinates!, lng: parseFloat(e.target.value) || 0 }
                      })}
                      placeholder="0.000000"
                    />
                  </div>
                </div>
              </div>

              {/* Bed Availability */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Bed Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">General Beds</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.generalBeds || 0}
                      onChange={(e) => setFormData({ ...formData, generalBeds: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">ICU Beds</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.icuBeds || 0}
                      onChange={(e) => setFormData({ ...formData, icuBeds: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Emergency Beds</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.emergencyBeds || 0}
                      onChange={(e) => setFormData({ ...formData, emergencyBeds: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Specialties</h3>
                <div>
                  <label className="text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
                  <Input
                    value={formData.specialties?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specialties: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    placeholder="Cardiology, Neurology, Oncology..."
                  />
                </div>
              </div>

              {/* Facilities */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Facilities</h3>
                <div>
                  <label className="text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
                  <Input
                    value={formData.facilities?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      facilities: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                    })}
                    placeholder="Emergency Room, ICU, Laboratory..."
                  />
                </div>
              </div>

              {/* Health Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Health Cards Accepted</h3>
                <div>
                  <label className="text-sm font-medium text-gray-700">Health Cards (comma-separated)</label>
                  <Input
                    value={formData.healthCards?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      healthCards: e.target.value.split(',').map(h => h.trim()).filter(h => h)
                    })}
                    placeholder="ABHA, Ayushman Bharat, CGHS..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddHospital} className="bg-black hover:bg-gray-800 text-white">
                  Add Hospital
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search hospitals by name, address, or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl border-gray-200"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">{hospitals.length}</p>
                <p className="text-sm text-gray-600">Total Hospitals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">{hospitals.filter(h => h.verified).length}</p>
                <p className="text-sm text-gray-600">Verified Hospitals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Ambulance className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">{hospitals.filter(h => h.emergencyServices).length}</p>
                <p className="text-sm text-gray-600">Emergency Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <Card className="border-0 shadow-lg rounded-xl">
          <CardContent className="p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first hospital to get started'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingHospital} onOpenChange={() => setEditingHospital(null)}>
        <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-4xl md:max-w-5xl lg:max-w-[95vw] h-[90vh] flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 p-6">
            <DialogTitle>Edit Hospital</DialogTitle>
            <DialogDescription>
              Update the complete hospital information
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Hospital Name</label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <Textarea
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <Input
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
            </div>

            {/* Status & Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Status & Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Emergency Services</label>
                  <Select
                    value={formData.emergencyServices ? 'yes' : 'no'}
                    onValueChange={(value: string) => setFormData({ ...formData, emergencyServices: value === 'yes' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Verification Status</label>
                  <Select
                    value={formData.verified ? 'verified' : 'pending'}
                    onValueChange={(value: string) => setFormData({ ...formData, verified: value === 'verified' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Rating</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || 0}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                    placeholder="0.0"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Latitude</label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.coordinates?.lat || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      coordinates: { ...formData.coordinates!, lat: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="0.000000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Longitude</label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.coordinates?.lng || 0}
                    onChange={(e) => setFormData({
                      ...formData,
                      coordinates: { ...formData.coordinates!, lng: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="0.000000"
                  />
                </div>
              </div>
            </div>

            {/* Bed Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Bed Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">General Beds</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.generalBeds || 0}
                    onChange={(e) => setFormData({ ...formData, generalBeds: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">ICU Beds</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.icuBeds || 0}
                    onChange={(e) => setFormData({ ...formData, icuBeds: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Emergency Beds</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.emergencyBeds || 0}
                    onChange={(e) => setFormData({ ...formData, emergencyBeds: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Specialties</h3>
              <div>
                <label className="text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
                <Input
                  value={formData.specialties?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specialties: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  placeholder="Cardiology, Neurology, Oncology..."
                />
              </div>
            </div>

            {/* Facilities */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Facilities</h3>
              <div>
                <label className="text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
                <Input
                  value={formData.facilities?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    facilities: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                  })}
                  placeholder="Emergency Room, ICU, Laboratory..."
                />
              </div>
            </div>

            {/* Health Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Health Cards Accepted</h3>
              <div>
                <label className="text-sm font-medium text-gray-700">Health Cards (comma-separated)</label>
                <Input
                  value={formData.healthCards?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    healthCards: e.target.value.split(',').map(h => h.trim()).filter(h => h)
                  })}
                  placeholder="ABHA, Ayushman Bharat, CGHS..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEditingHospital(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateHospital} className="bg-black hover:bg-gray-800 text-white">
                Update Hospital
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
