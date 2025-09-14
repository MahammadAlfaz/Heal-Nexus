import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAppData } from './AppDataContext';
import {
  Pill,
  Search,
  Plus,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface MedicineDatabaseProps {
  onNavigate: (page: string, data?: any) => void;
}

export function MedicineDatabase({ onNavigate }: MedicineDatabaseProps) {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Medicine Database</h2>
        <p className="text-gray-600">Manage the central database of verified medicines</p>
      </div>

      <Card className="border-0 shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Medicines</CardTitle>
              <CardDescription>Total medicines in database: {medicines.length}</CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, generic, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand Name</TableHead>
                  <TableHead>Generic Name</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Verified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{med.genericName}</TableCell>
                    <TableCell>{med.manufacturer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{med.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {med.verified ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
              <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">No medicines found</h3>
              <p className="text-gray-600">
                There are no medicines matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}