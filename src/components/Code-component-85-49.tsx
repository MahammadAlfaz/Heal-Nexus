import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Calendar, 
  User,
  Stethoscope,
  MessageSquare,
  Save,
  Eye
} from 'lucide-react';

interface ReportViewerProps {
  report: any;
  onNavigate: (page: 'patient-dashboard' | 'doctor-dashboard') => void;
  userType: 'patient' | 'doctor' | null;
}

export function ReportViewer({ report, onNavigate, userType }: ReportViewerProps) {
  const [doctorNotes, setDoctorNotes] = useState('');
  const [annotations, setAnnotations] = useState([
    {
      id: 1,
      doctor: 'Dr. Smith',
      date: '2024-01-16',
      note: 'Blood glucose levels are within normal range. Continue current medication.'
    },
    {
      id: 2,
      doctor: 'Dr. Johnson',
      date: '2024-01-15',
      note: 'Patient shows good response to treatment. Schedule follow-up in 2 weeks.'
    }
  ]);

  const handleSaveNotes = () => {
    if (doctorNotes.trim()) {
      const newAnnotation = {
        id: annotations.length + 1,
        doctor: 'Dr. Williams',
        date: new Date().toISOString().split('T')[0],
        note: doctorNotes
      };
      setAnnotations([newAnnotation, ...annotations]);
      setDoctorNotes('');
    }
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="w-16 h-16 text-gray-400 mx-auto" />
          <p className="text-gray-600">No report selected</p>
          <Button 
            onClick={() => onNavigate(userType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
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
          
          <Button variant="outline" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Header */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-gray-900">
                      {report.type || 'Medical Report'}
                    </CardTitle>
                    <CardDescription>
                      {report.patientName && `Patient: ${report.patientName}`}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={report.status === 'Reviewed' ? 'default' : 'secondary'}
                    className="rounded-lg"
                  >
                    {report.status || 'Pending Review'}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Report Preview */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Report Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-xl p-8 min-h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-gray-900 font-medium">
                        {report.file || 'medical_report.pdf'}
                      </p>
                      <p className="text-gray-600">
                        PDF preview would be displayed here
                      </p>
                    </div>
                    <Button variant="outline" className="rounded-xl">
                      <FileText className="w-4 h-4 mr-2" />
                      Open in Full Screen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Metadata & Annotations */}
          <div className="space-y-6">
            {/* Report Metadata */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Report Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{report.date || '2024-01-15'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Stethoscope className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-medium">{report.doctor || 'Dr. Smith'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">{report.type || 'Blood Test'}</p>
                    </div>
                  </div>

                  {report.priority && (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${
                          report.priority === 'Urgent' ? 'bg-red-500' :
                          report.priority === 'High' ? 'bg-orange-500' :
                          'bg-green-500'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Priority</p>
                        <p className="font-medium">{report.priority}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Doctor Notes (Only for doctors) */}
            {userType === 'doctor' && (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Add Notes
                  </CardTitle>
                  <CardDescription>
                    Add your observations and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter your medical notes and recommendations..."
                    className="min-h-24 rounded-xl"
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                  />
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl"
                    onClick={handleSaveNotes}
                    disabled={!doctorNotes.trim()}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Notes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Annotations & Comments */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Medical Notes</CardTitle>
                <CardDescription>
                  Doctor's observations and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {annotations.map((annotation, index) => (
                    <div key={annotation.id}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {annotation.doctor}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {annotation.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {annotation.note}
                        </p>
                      </div>
                      {index < annotations.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                  
                  {annotations.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No medical notes yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}