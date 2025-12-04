import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  User,
  Stethoscope,
  MessageSquare,
  Save,
  Eye,
  Brain,
  Microscope,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ReportViewerProps {
  report: any;
  onNavigate: (page: 'patient-dashboard' | 'doctor-dashboard') => void;
  userType: 'patient' | 'doctor' | 'admin' | null;
}

interface ExtractedData {
  summary: string;
  testResults: Array<{
    testName: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'high' | 'low';
  }>;
}

function parseValue(value: string): number | null {
  if (!value) return null;
  const parts = value.split(',').map(v => v.trim());
  const num = parseFloat(parts[0]);
  return isNaN(num) ? null : num;
}

function calculateProgress(value: number | null, referenceRange: string): number {
  if (value === null || !referenceRange) return 0;
  const rangeParts = referenceRange.split('-').map(r => parseFloat(r));
  if (rangeParts.length !== 2 || rangeParts.some(isNaN)) return 0;
  const [min, max] = rangeParts;
  if (value < min) return (value / min) * 50;
  if (value > max) return 50 + ((value - max) / max) * 50;
  return ((value - min) / (max - min)) * 100;
}

const testCategories: { [key: string]: string[] } = {
  'Complete Blood Count': ['WBC', 'Hemoglobin', 'Platelet Count'],
  'Liver Function': ['AST', 'ALT', 'Albumin'],
  'Inflammatory Markers': ['ESR', 'CRP', 'Ferritin'],
  'Cardiac Markers': ['Troponin I', 'NT-Pro-BNP'],
  'Coagulation': ['PT', 'D-dimer', 'Fibrinogen'],
  'Viral Tests': [
    'PCR NAAT for SARS-Cov-2 (rapid Abbott)',
    'PCR NAAT for ORFlab and S gene from SARS-CoV-2 (diasorin molecular)',
    'NAAT for S and M genes from SARS-CoV-2 (Biofire)'
  ]
};

function groupTestsByCategory(tests: ExtractedData['testResults']) {
  const grouped: { [key: string]: ExtractedData['testResults'] } = {};
  for (const category in testCategories) {
    grouped[category] = [];
  }
  for (const test of tests) {
    let found = false;
    for (const category in testCategories) {
      if (testCategories[category].includes(test.testName)) {
        grouped[category].push(test);
        found = true;
        break;
      }
    }
    if (!found) {
      if (!grouped['Other']) grouped['Other'] = [];
      grouped['Other'].push(test);
    }
  }
  return grouped;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'bg-green-400';
    case 'high':
      return 'bg-red-400';
    case 'low':
      return 'bg-yellow-400';
    default:
      return 'bg-gray-400';
  }
};

export function ReportViewer({ report, onNavigate, userType }: ReportViewerProps) {
  const API_BASE_URL = 'http://localhost:8082';
  const reportUrl = report?.fileUrl?.split('?')[0];

  const [doctorNotes, setDoctorNotes] = useState('');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
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

  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    if (report?.extractedData) {
      // Ensure extractedData is a string before trying to parse.
      if (typeof report.extractedData !== 'string') {
        setExtractedData(report.extractedData); // Assume it's already an object
        return;
      }
      try {
        const parsed = JSON.parse(report.extractedData);
        setExtractedData(parsed);
        setParseError(null);
      } catch (error) {
        console.error('Error parsing extracted data:', error);
        setParseError('Failed to parse analysis data');
        setExtractedData(null);
      }
    }
  }, [report]);

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

  const groupedTests = extractedData ? groupTestsByCategory(extractedData.testResults) : {};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
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

          <Button variant="outline" className="rounded-lg sm:rounded-xl text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
          {/* Report Display */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Report Header */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 sm:gap-0">
                  <div className="space-y-2">
                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-gray-900">
                      {report.type || 'Medical Report'}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {report.patientName && `Patient: ${report.patientName}`}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={report.status === 'Reviewed' ? 'default' : 'secondary'}
                    className="rounded-lg text-sm sm:text-base px-3 py-1"
                  >
                    {report.status || 'Pending Review'}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Report Preview */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Eye className="w-5 h-5" />
                  Report Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reportUrl ? (
                  <iframe
                    src={`${API_BASE_URL}${reportUrl}`}
                    className="w-full h-[400px] sm:h-[600px] md:h-[800px] rounded-xl border"
                    title={report.type || 'Report Preview'}
                  />
                ) : (
                  <div className="bg-gray-100 rounded-xl p-8 min-h-96 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                      <p className="text-gray-900 font-medium">
                        No file attached
                      </p>
                      <p className="text-gray-600">
                        A preview is not available for this report.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Analysis Results */}
            {extractedData && (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Brain className="w-5 h-5" />
                    AI Analysis Results
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    OCR-extracted data analyzed by Gemini AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {extractedData.summary && (
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <Microscope className="w-4 h-4" />
                        Summary
                      </h4>
                      <p className="text-blue-800">{extractedData.summary}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {Object.entries(groupedTests).map(([category, tests]) => (
                      <Card key={category} className="p-4 rounded-xl shadow-md border border-gray-200">
                        <h3 className="font-semibold text-lg mb-4">{category}</h3>
                        <div className="space-y-4">
                          {tests.map((test, idx) => {
                            const valueNum = parseValue(test.value);
                            const progress = calculateProgress(valueNum, test.referenceRange);
                            const barColor = getStatusColor(test.status);
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm font-medium text-gray-700">
                                  <span>{test.testName}</span>
                                  <span>{test.value} {test.unit}</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`${barColor} h-3 rounded-full`}
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {category === 'Inflammatory Markers' && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-800 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Risk assessment: Elevated inflammatory markers detected</span>
                          </div>
                        )}
                        {category === 'Complete Blood Count' && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg text-green-800 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Overall blood cell counts are within expected ranges</span>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>

                  {(!extractedData.summary || extractedData.testResults.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No analysis results available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Report Metadata & Annotations */}
          <div className="space-y-6">
            {/* Report Metadata */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">Report Information</CardTitle>
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
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <MessageSquare className="w-5 h-5" />
                    Add Notes
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
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
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">Medical Notes</CardTitle>
                <CardDescription className="text-sm sm:text-base">
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
                        <div className="border-t border-gray-200 mt-4" />
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
