import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useAppData } from './AppDataContext';
import {
  UserCheck,
  Search,
  Check,
  X,
  Clock,
  Shield,
  Users,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface DoctorVerificationProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DoctorVerification({ onNavigate }: DoctorVerificationProps) {
  const { doctors, verifyDoctor } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [loadingDoctorId, setLoadingDoctorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doctor.licenseNumber && doctor.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === 'all') return matchesSearch;
    return doctor.status === activeTab && matchesSearch;
  });

  const stats = {
    total: doctors.length,
    pending: doctors.filter(d => d.status === 'pending').length,
    approved: doctors.filter(d => d.status === 'approved').length,
    rejected: doctors.filter(d => d.status === 'rejected').length,
  };

  const handleVerify = async (doctorEmail: string, status: 'approved' | 'rejected') => {
    setLoadingDoctorId(doctorEmail);
    setError(null);
    try {
      await verifyDoctor(doctorEmail, status);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${status} doctor.`);
    } finally {
      setLoadingDoctorId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900">Doctor Verification</h2>
        <p className="text-gray-600">Approve or reject new healthcare professional registrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Doctors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <X className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.rejected}</p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctor List */}
      <Card className="border-gray-200 shadow-sm rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Verification Queue</CardTitle>
              <CardDescription>Review the credentials of new doctors</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name, specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
            </TabsList>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>License Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <div className="font-medium">{doctor.fullName}</div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                      </TableCell>
                      <TableCell>{doctor.specialization}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{doctor.licenseNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            doctor.status === 'approved' ? 'bg-green-100 text-green-800' :
                            doctor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {doctor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {doctor.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button
                              disabled={loadingDoctorId === doctor.email}
                              size="sm"
                              onClick={() => handleVerify(doctor.email, 'approved')}
                              className="bg-black hover:bg-gray-800 text-white rounded-lg"
                            >
                              {loadingDoctorId === doctor.email ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4 mr-1" />
                              )}
                              {loadingDoctorId === doctor.email ? 'Approving...' : 'Approve'}
                            </Button>
                            <Button
                              disabled={loadingDoctorId === doctor.email}
                              size="sm"
                              variant="destructive"
                              onClick={() => handleVerify(doctor.email, 'rejected')}
                              className="rounded-lg"
                            >
                              {loadingDoctorId !== doctor.email && <X className="w-4 h-4 mr-1" />}
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {doctor.verificationDate ? `Reviewed on ${doctor.verificationDate}` : 'No action needed'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">
                There are no doctors matching your current filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}