import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Sidebar } from './Sidebar';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Search,
  Brain,
  Activity,
  Heart,
  BarChart3,
  Calendar,
  User
} from 'lucide-react';

interface ReportAnalysisProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function ReportAnalysis({ onNavigate, userType }: ReportAnalysisProps) {
  const [activeSection, setActiveSection] = useState('analysis');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [analysisNotes, setAnalysisNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mockReports = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      type: 'Blood Test',
      date: '2024-01-15',
      status: 'Needs Analysis',
      priority: 'High',
      aiSummary: 'Elevated glucose levels (180 mg/dL), HbA1c at 8.2%. Liver enzymes slightly elevated.',
      keyFindings: ['Glucose: 180 mg/dL (High)', 'HbA1c: 8.2% (High)', 'ALT: 45 U/L (Elevated)'],
      riskFactors: ['Diabetes progression', 'Liver function concern'],
      recommendations: ['Adjust diabetes medication', 'Liver function follow-up', 'Dietary consultation'],
      trend: 'Worsening',
      previousReports: 3
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      patientId: 'P002',
      type: 'Chest X-Ray',
      date: '2024-01-12',
      status: 'AI Analysis Complete',
      priority: 'Normal',
      aiSummary: 'Clear lung fields, normal heart size, no acute abnormalities detected.',
      keyFindings: ['Lung fields: Clear', 'Heart size: Normal', 'Diaphragm: Normal position'],
      riskFactors: ['No significant risk factors identified'],
      recommendations: ['Routine follow-up', 'Continue current treatment'],
      trend: 'Stable',
      previousReports: 5
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      patientId: 'P003',
      type: 'Cardiac MRI',
      date: '2024-01-08',
      status: 'Urgent Review',
      priority: 'Critical',
      aiSummary: 'Reduced ejection fraction (35%), wall motion abnormalities in anterior wall.',
      keyFindings: ['Ejection Fraction: 35% (Reduced)', 'Wall motion: Anterior hypokinesis', 'Chamber size: Mildly enlarged'],
      riskFactors: ['Heart failure risk', 'Coronary artery disease'],
      recommendations: ['Cardiology referral urgent', 'Echo follow-up', 'Medication review'],
      trend: 'Deteriorating',
      previousReports: 7
    }
  ];

  const mockTrends = [
    { parameter: 'Blood Glucose', current: 180, previous: 165, change: '+9.1%', status: 'worsening' },
    { parameter: 'Blood Pressure', current: '145/92', previous: '140/88', change: '+3.6%', status: 'worsening' },
    { parameter: 'Cholesterol', current: 220, previous: 235, change: '-6.4%', status: 'improving' },
    { parameter: 'Weight', current: 78, previous: 80, change: '-2.5%', status: 'improving' }
  ];

  const renderAnalysisDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900">AI Report Analysis Center</h1>
        <p className="text-gray-600 mt-1">AI-powered medical report analysis and insights</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reports Analyzed Today</p>
                <p className="text-2xl text-primary">45</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Analysis</p>
                <p className="text-2xl text-yellow-600">12</p>
              </div>
              <FileText className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Findings</p>
                <p className="text-2xl text-red-600">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Accuracy</p>
                <p className="text-2xl text-green-600">94.8%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by patient name, report type, or findings..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              Search Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports for Analysis */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Reports for Analysis
          </CardTitle>
          <CardDescription>Medical reports requiring doctor review and validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{report.patient}</span>
                        <span className="text-sm text-gray-500">({report.patientId})</span>
                      </div>
                      <Badge 
                        variant={report.priority === 'Critical' ? 'destructive' : report.priority === 'High' ? 'default' : 'secondary'}
                        className="rounded-lg"
                      >
                        {report.priority}
                      </Badge>
                      <Badge 
                        variant={report.status === 'Urgent Review' ? 'destructive' : 'secondary'}
                        className="rounded-lg"
                      >
                        {report.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Report Type: <span className="text-gray-900 font-medium">{report.type}</span></p>
                        <p className="text-gray-600 mb-1">Date: <span className="text-gray-900">{report.date}</span></p>
                        <p className="text-gray-600">Trend: 
                          <span className={`ml-1 font-medium ${
                            report.trend === 'Worsening' || report.trend === 'Deteriorating' ? 'text-red-600' : 
                            report.trend === 'Improving' ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {report.trend}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">AI Summary:</p>
                        <p className="text-xs text-gray-700 line-clamp-2">{report.aiSummary}</p>
                        <p className="text-gray-500 text-xs mt-1">Previous reports: {report.previousReports}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Parameters */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Patient Health Trends
          </CardTitle>
          <CardDescription>Key health parameters across patient population</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {mockTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{trend.parameter}</p>
                  <p className="text-sm text-gray-600">Current: {trend.current}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    trend.status === 'improving' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.change}
                  </p>
                  <p className="text-xs text-gray-500">vs previous</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedReport(null)}>
          ← Back to Reports
        </Button>
        <div>
          <h1 className="text-3xl text-gray-900">AI Report Analysis</h1>
          <p className="text-gray-600">Patient: {selectedReport?.patient} • {selectedReport?.type}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Analysis Results */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">AI Summary</label>
              <p className="font-medium bg-blue-50 p-3 rounded-xl text-sm">{selectedReport?.aiSummary}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Key Findings</label>
              <div className="space-y-2 mt-2">
                {selectedReport?.keyFindings.map((finding: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Risk Factors</label>
              <div className="space-y-2 mt-2">
                {selectedReport?.riskFactors.map((risk: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Suggested Actions</label>
              <div className="space-y-2 mt-2">
                {selectedReport?.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-sm text-yellow-800 font-medium">Clinical Priority</p>
              <p className="text-sm text-yellow-700">
                {selectedReport?.priority === 'Critical' 
                  ? 'Immediate intervention required within 24 hours'
                  : selectedReport?.priority === 'High'
                  ? 'Schedule follow-up within 1 week'
                  : 'Routine monitoring recommended'
                }
              </p>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-up
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Doctor's Analysis */}
        <Card className="border-0 shadow-lg rounded-2xl md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Doctor's Clinical Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your clinical analysis, additional observations, treatment modifications, or patient-specific recommendations..."
              className="min-h-32 rounded-xl"
              value={analysisNotes}
              onChange={(e) => setAnalysisNotes(e.target.value)}
            />
            
            <div className="flex gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve AI Analysis
              </Button>
              <Button variant="outline" className="border-yellow-300 text-yellow-700 rounded-xl">
                Modify Recommendations
              </Button>
              <Button variant="outline" className="rounded-xl">
                Request Additional Tests
              </Button>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-green-800 font-medium">Clinical Decision Support:</p>
              <p className="text-sm text-green-700">AI analysis confidence: 94%. Recommendations align with clinical guidelines for diabetes management.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedReport) {
      return renderReportDetails();
    }
    return renderAnalysisDashboard();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        userType={userType || 'doctor'}
        activeSection="report-analysis"
        onSectionChange={setActiveSection}
        onNavigate={onNavigate}
        onLogout={() => onNavigate('landing')}
      />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}