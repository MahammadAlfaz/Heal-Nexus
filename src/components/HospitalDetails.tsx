import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  AlertTriangle,
  Ambulance,
  Users,
  Stethoscope
} from 'lucide-react';

export function HospitalDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const hospital = location.state;

  if (!hospital) {
    return (
      <div className="p-6">
        <p>No hospital data available.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button onClick={() => navigate(-1)} className="mb-4">
        Back
      </Button>
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Building2 className="w-8 h-8 text-gray-600" />
            <CardTitle className="text-2xl">{hospital.name}</CardTitle>
            <Badge className={`px-3 py-1 text-sm ${hospital.verified ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
              {hospital.verified ? <CheckCircle className="w-4 h-4 mr-1 inline" /> : <AlertTriangle className="w-4 h-4 mr-1 inline" />}
              {hospital.verified ? 'Verified' : 'Pending'}
            </Badge>
            {hospital.emergencyServices && (
              <Badge className="bg-red-50 text-red-600 border-red-200 px-3 py-1 text-sm">
                <Ambulance className="w-4 h-4 mr-1 inline" />
                Emergency
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5" />
            <span>{hospital.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-5 h-5" />
            <span>{hospital.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-5 h-5" />
            <span>{hospital.email}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="w-5 h-5" />
            <span>{hospital.rating} rating</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((spec: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.facilities.map((fac: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {fac}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Health Cards Accepted</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.healthCards.map((card: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {card}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Bed Availability</h3>
            <div className="grid grid-cols-3 gap-4 text-gray-700">
              <div>
                <strong>General Beds:</strong> {hospital.generalBeds}
              </div>
              <div>
                <strong>ICU Beds:</strong> {hospital.icuBeds}
              </div>
              <div>
                <strong>Emergency Beds:</strong> {hospital.emergencyBeds}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
