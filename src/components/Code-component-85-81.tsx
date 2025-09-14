import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Video, 
  VideoOff,
  Mic, 
  MicOff,
  Phone,
  PhoneOff,
  Camera,
  CameraOff,
  Share,
  MessageSquare,
  Clock,
  Calendar,
  Users,
  FileText,
  Upload,
  Download,
  Settings,
  Monitor,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  RotateCcw,
  Send,
  Paperclip,
  User,
  MapPin,
  Star
} from 'lucide-react';

interface TelehealthConsultationProps {
  onNavigate: (page: string, data?: any) => void;
  userType: 'patient' | 'doctor' | null;
}

export function TelehealthConsultation({ onNavigate, userType }: TelehealthConsultationProps) {
  const [activeTab, setActiveTab] = useState('console');
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [chatMessage, setChatMessage] = useState('');

  const mockConsultations = [
    {
      id: 1,
      patient: {
        name: 'John Doe',
        patientId: 'P001',
        age: 45,
        avatar: '',
        location: 'New York, NY'
      },
      type: 'Scheduled',
      appointmentTime: '10:00 AM',
      duration: '30 min',
      status: 'Waiting',
      reason: 'Follow-up consultation for hypertension',
      priority: 'Normal',
      notes: 'Patient reports feeling better with new medication'
    },
    {
      id: 2,
      patient: {
        name: 'Jane Smith',
        patientId: 'P002',
        age: 32,
        avatar: '',
        location: 'Los Angeles, CA'
      },
      type: 'Emergency',
      appointmentTime: 'Now',
      duration: '45 min',
      status: 'In Progress',
      reason: 'Chest pain and shortness of breath',
      priority: 'Urgent',
      notes: 'Patient experiencing acute symptoms, needs immediate attention'
    },
    {
      id: 3,
      patient: {
        name: 'Mike Johnson',
        patientId: 'P003',
        age: 67,
        avatar: '',
        location: 'Chicago, IL'
      },
      type: 'Scheduled',
      appointmentTime: '11:30 AM',
      duration: '20 min',
      status: 'Confirmed',
      reason: 'Routine diabetes check-up',
      priority: 'Normal',
      notes: 'Regular quarterly check-up for diabetes management'
    },
    {
      id: 4,
      patient: {
        name: 'Sarah Wilson',
        patientId: 'P004',
        age: 28,
        avatar: '',
        location: 'Miami, FL'
      },
      type: 'Scheduled',
      appointmentTime: '2:00 PM',
      duration: '30 min',
      status: 'Confirmed',
      reason: 'Post-surgery follow-up',
      priority: 'High',
      notes: 'Two weeks post appendectomy, checking recovery progress'
    }
  ];

  const mockChatMessages = [
    {
      id: 1,
      sender: 'patient',
      message: 'Hello Doctor, I can see and hear you clearly.',
      time: '10:02 AM'
    },
    {
      id: 2,
      sender: 'doctor',
      message: 'Good morning! I can see you too. How are you feeling today?',
      time: '10:02 AM'
    },
    {
      id: 3,
      sender: 'patient',
      message: 'Much better than last week. The medication seems to be helping.',
      time: '10:03 AM'
    },
    {
      id: 4,
      sender: 'doctor',
      message: 'That\'s great to hear. Let\'s go through your symptoms checklist.',
      time: '10:03 AM'
    }
  ];

  const renderConsole = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Today's Calls</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Time</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">4.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Waiting</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Rating</p>
                <p className="text-lg sm:text-2xl font-medium text-gray-900">4.9</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultation Queue */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-base sm:text-lg">Consultation Queue</CardTitle>
              <CardDescription className="text-sm">Upcoming and current telehealth consultations</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Patient</TableHead>
                  <TableHead className="hidden sm:table-cell">Reason</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="hidden md:table-cell">Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{consultation.patient.name}</p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {consultation.patient.location}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <p className="text-sm max-w-xs truncate">{consultation.reason}</p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{consultation.appointmentTime}</p>
                        <p className="text-xs text-gray-600">{consultation.duration}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        variant={
                          consultation.priority === 'Urgent' ? 'destructive' : 
                          consultation.priority === 'High' ? 'default' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {consultation.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          consultation.status === 'In Progress' ? 'default' : 
                          consultation.status === 'Waiting' ? 'destructive' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {consultation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-lg text-xs px-2 py-1"
                          onClick={() => setSelectedConsultation(consultation)}
                        >
                          <Video className="w-3 h-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVideoCall = () => (
    <div className="space-y-4">
      {/* Video Call Interface */}
      <Card className="border-0 shadow-lg rounded-2xl bg-gray-900 text-white">
        <CardContent className="p-4 sm:p-6">
          <div className="aspect-video bg-gray-800 rounded-xl relative mb-4">
            {/* Main video area */}
            <div className="absolute inset-0 flex items-center justify-center">
              {videoEnabled ? (
                <div className="text-center">
                  <Video className="w-12 h-12 mx-auto mb-2 text-white" />
                  <p className="text-white">Dr. Williams</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">Camera Off</p>
                </div>
              )}
            </div>
            
            {/* Patient video (small) */}
            <div className="absolute top-4 right-4 w-24 sm:w-32 aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <User className="w-6 h-6 mx-auto mb-1 text-white" />
                <p className="text-xs text-white">Patient</p>
              </div>
            </div>

            {/* Screen sharing indicator */}
            {screenSharing && (
              <div className="absolute top-4 left-4 bg-green-600 px-3 py-1 rounded-lg">
                <div className="flex items-center gap-1">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">Sharing</span>
                </div>
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <Button
              variant={audioEnabled ? "outline" : "destructive"}
              size="sm"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
              onClick={() => setAudioEnabled(!audioEnabled)}
            >
              {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>

            <Button
              variant={videoEnabled ? "outline" : "destructive"}
              size="sm"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            </Button>

            <Button
              variant={screenSharing ? "default" : "outline"}
              size="sm"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
              onClick={() => setScreenSharing(!screenSharing)}
            >
              <Share className="w-4 h-4" />
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
              onClick={() => setInCall(false)}
            >
              <PhoneOff className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient Info */}
        <Card className="border-0 shadow-lg rounded-2xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedConsultation && (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium">{selectedConsultation.patient.name}</h3>
                  <p className="text-sm text-gray-600">{selectedConsultation.patient.patientId}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span>{selectedConsultation.patient.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-right">{selectedConsultation.patient.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span>{selectedConsultation.type}</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600 mb-1">Reason for consultation:</p>
                  <p className="text-sm">{selectedConsultation.reason}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="border-0 shadow-lg rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Messages */}
              <div className="h-48 overflow-y-auto space-y-3 border rounded-lg p-3">
                {mockChatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'doctor' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button size="sm" className="rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Telehealth Settings</CardTitle>
          <CardDescription>Configure your video consultation preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Audio/Video Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Default Camera</span>
                  <Button variant="outline" size="sm" className="rounded-lg">Select</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Default Microphone</span>
                  <Button variant="outline" size="sm" className="rounded-lg">Select</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Default Speaker</span>
                  <Button variant="outline" size="sm" className="rounded-lg">Select</Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Consultation Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-record Sessions</span>
                  <Button variant="outline" size="sm" className="rounded-lg">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Waiting Room</span>
                  <Button variant="outline" size="sm" className="rounded-lg">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Chat History</span>
                  <Button variant="outline" size="sm" className="rounded-lg">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              onClick={() => onNavigate('doctor-dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">Telehealth Console</h1>
              <p className="text-sm text-gray-600">Video consultations and virtual patient care</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="rounded-xl"
              onClick={() => setInCall(true)}
            >
              <Video className="w-4 h-4 mr-2" />
              Test Call
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        {/* Content */}
        {inCall ? (
          renderVideoCall()
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="console" className="text-sm">Console</TabsTrigger>
              <TabsTrigger value="history" className="text-sm">History</TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="console">
              {renderConsole()}
            </TabsContent>

            <TabsContent value="history">
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Consultation History</CardTitle>
                  <CardDescription>Past telehealth consultations and recordings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Consultation history will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              {renderSettings()}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}