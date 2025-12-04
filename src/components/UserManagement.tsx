import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useAppData } from './AppDataContext';
import {
  Users,
  Search,
  Trash2,
  Edit,
  User,
  Stethoscope
} from 'lucide-react';

interface UserManagementProps {
  onNavigate: (page: string, data?: any) => void;
}

export function UserManagement({ onNavigate }: UserManagementProps) {
  const { patients, doctors, deletePatient, deleteDoctor } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('patients');

  const allUsers = [...patients.map(p => ({...p, type: 'patient'})), ...doctors.map(d => ({...d, type: 'doctor'}))];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return user.type === activeTab && matchesSearch;
  });

  const handleDelete = (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      if (type === 'patient') {
        deletePatient(id);
      } else {
        deleteDoctor(id);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">User Management</h2>
        <p className="text-gray-600">View, edit, and manage all users on the platform</p>
      </div>

      <Card className="border-gray-200 shadow-sm rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Total users: {allUsers.length}</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="patient">Patients ({patients.length})</TabsTrigger>
              <TabsTrigger value="doctor">Doctors ({doctors.length})</TabsTrigger>
              <TabsTrigger value="all">All ({allUsers.length})</TabsTrigger>
            </TabsList>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.type === 'doctor' ? <Stethoscope className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                          {user.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.status === 'active' || user.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg border-gray-300">
                            <Edit className="w-4 h-4 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="destructive" className="rounded-lg" onClick={() => handleDelete(user.id, user.type)}>
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">There are no users matching your current filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}