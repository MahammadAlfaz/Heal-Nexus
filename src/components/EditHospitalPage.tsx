import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAppData, Hospital } from './AppDataContext';
import { updateHospital as apiUpdateHospital } from '../utils/api';

export function EditHospitalPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { hospitals, updateHospital } = useAppData();

  const hospitalToEdit = hospitals.find((h) => h.id === id);

  const [formData, setFormData] = useState<Partial<Hospital>>(hospitalToEdit || {
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
    emergencyBeds: 0,
  });

  useEffect(() => {
    if (hospitalToEdit) {
      setFormData(hospitalToEdit);
    }
  }, [hospitalToEdit]);

  const handleUpdateHospital = async () => {
    if (id && formData.name && formData.address && formData.phone && formData.email) {
      try {
        const updatedHospitalData = await apiUpdateHospital(id, formData);
        updateHospital(id, updatedHospitalData);
        navigate('/hospital-management');
      } catch (error) {
        console.error('Failed to update hospital:', error);
        alert('Failed to update hospital. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  if (!hospitalToEdit) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Hospital Not Found</h2>
        <Button onClick={() => navigate('/hospital-management')}>Back to Hospital Management</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Hospital</h2>

      {/* Basic Information */}
      <div className="space-y-4 mb-6">
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
      <div className="space-y-4 mb-6">
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
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Latitude</label>
            <Input
              type="number"
              step="0.000001"
              value={formData.coordinates?.lat || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coordinates: { ...formData.coordinates!, lat: parseFloat(e.target.value) || 0 },
                })
              }
              placeholder="0.000000"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Longitude</label>
            <Input
              type="number"
              step="0.000001"
              value={formData.coordinates?.lng || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coordinates: { ...formData.coordinates!, lng: parseFloat(e.target.value) || 0 },
                })
              }
              placeholder="0.000000"
            />
          </div>
        </div>
      </div>

      {/* Bed Availability */}
      <div className="space-y-4 mb-6">
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
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900">Specialties</h3>
        <div>
          <label className="text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
          <Input
            value={formData.specialties?.join(', ') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                specialties: e.target.value.split(',').map((s) => s.trim()).filter((s) => s),
              })
            }
            placeholder="Cardiology, Neurology, Oncology..."
          />
        </div>
      </div>

      {/* Facilities */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900">Facilities</h3>
        <div>
          <label className="text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
          <Input
            value={formData.facilities?.join(', ') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                facilities: e.target.value.split(',').map((f) => f.trim()).filter((f) => f),
              })
            }
            placeholder="Emergency Room, ICU, Laboratory..."
          />
        </div>
      </div>

      {/* Health Cards */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900">Health Cards Accepted</h3>
        <div>
          <label className="text-sm font-medium text-gray-700">Health Cards (comma-separated)</label>
          <Input
            value={formData.healthCards?.join(', ') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                healthCards: e.target.value.split(',').map((h) => h.trim()).filter((h) => h),
              })
            }
            placeholder="ABHA, Ayushman Bharat, CGHS..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/hospital-management')}>
          Cancel
        </Button>
        <Button onClick={handleUpdateHospital} className="bg-black hover:bg-gray-800 text-white">
          Update Hospital
        </Button>
      </div>
    </div>
  );
}
