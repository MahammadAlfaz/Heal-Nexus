import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Bot, 
  Send, 
  Mic, 
  MicOff,
  Volume2,
  User,
  Calendar,
  Pill,
  FileText,
  Stethoscope,
  AlertCircle,
  Clock,
  Heart,
  Activity
} from 'lucide-react';

interface HealthAssistantProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actionButtons?: {
    label: string;
    action: string;
    variant?: 'default' | 'outline' | 'destructive';
  }[];
}

export function HealthAssistant({ onNavigate, userType }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: `Hello! I'm your AI Health Assistant. I can help you with:\n\n• Medicine usage questions\n• Understanding your reports\n• Health reminders\n• Appointment booking\n• General health guidance\n\nHow can I assist you today?`,
      timestamp: new Date(),
      suggestions: [
        "What should I do if I miss a dose?",
        "Explain my blood report",
        "Book an appointment",
        "Emergency symptoms to watch"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const commonQuestions = [
    {
      category: 'Medicine',
      questions: [
        "Can I take paracetamol with food?",
        "What if I miss a dose?",
        "How to store medicines properly?",
        "When should I stop taking antibiotics?"
      ]
    },
    {
      category: 'Reports',
      questions: [
        "What does high blood sugar mean?",
        "Explain my cholesterol levels",
        "Is my blood pressure normal?",
        "What are normal hemoglobin levels?"
      ]
    },
    {
      category: 'Symptoms',
      questions: [
        "When should I see a doctor for fever?",
        "Is chest pain always serious?",
        "What causes frequent headaches?",
        "Signs of high blood pressure"
      ]
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const mockAIResponses = {
    medicine: {
      content: "Based on your question about medicine usage:\n\n• **Paracetamol**: Can be taken with or without food, every 4-6 hours as needed\n• **Missing a dose**: Take it as soon as you remember, but don't double dose\n• **Storage**: Keep in cool, dry place away from children\n\n⚠️ **Important**: Always follow your doctor's prescription exactly.",
      actionButtons: [
        { label: "Scan Medicine", action: "medicine-scanner", variant: "default" as const },
        { label: "Talk to Doctor", action: "doctor-connect", variant: "outline" as const }
      ]
    },
    reports: {
      content: "I can help explain your medical reports:\n\n• **Blood Sugar**: Normal fasting: 70-99 mg/dl\n• **Blood Pressure**: Normal: <120/80 mmHg\n• **Cholesterol**: Total should be <200 mg/dl\n\nFor detailed analysis, I'd need to see your specific report values.",
      actionButtons: [
        { label: "Upload Report", action: "upload-report", variant: "default" as const },
        { label: "Book Checkup", action: "appointment-booking", variant: "outline" as const }
      ]
    },
    symptoms: {
      content: "Here are some guidelines for common symptoms:\n\n🌡️ **Fever**: See doctor if >103°F or lasts >3 days\n💔 **Chest Pain**: Seek immediate help if severe, with shortness of breath\n🤕 **Headache**: Concerning if sudden, severe, with vision changes\n\n⚠️ **Emergency signs**: Difficulty breathing, severe chest pain, loss of consciousness",
      actionButtons: [
        { label: "Emergency SOS", action: "emergency-services", variant: "destructive" as const },
        { label: "Find Hospital", action: "hospital-finder", variant: "outline" as const }
      ]
    },
    appointment: {
      content: "I can help you book an appointment:\n\n• Find doctors by specialty\n• Check available time slots\n• Book online or in-person consultations\n• Set reminders\n\nWhich type of doctor would you like to see?",
      actionButtons: [
        { label: "Book Appointment", action: "appointment-booking", variant: "default" as const },
        { label: "Find Doctors", action: "hospital-finder", variant: "outline" as const }
      ]
    },
    emergency: {
      content: "🚨 **This seems like a medical emergency!**\n\nImmediate actions:\n1. Call 108 (ambulance) right away\n2. Don't drive yourself\n3. Inform family/emergency contact\n4. Go to nearest hospital\n\nI can help you find the closest hospital with available beds.",
      actionButtons: [
        { label: "Emergency SOS", action: "emergency-services", variant: "destructive" as const },
        { label: "Call Ambulance", action: "call-108", variant: "destructive" as const }
      ]
    }
  };

  const generateResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    
    let response = mockAIResponses.medicine; // default
    
    if (message.includes('emergency') || message.includes('chest pain') || message.includes('breathing') || message.includes('unconscious')) {
      response = mockAIResponses.emergency;
    } else if (message.includes('report') || message.includes('blood') || message.includes('sugar') || message.includes('pressure')) {
      response = mockAIResponses.reports;
    } else if (message.includes('symptom') || message.includes('fever') || message.includes('headache') || message.includes('pain')) {
      response = mockAIResponses.symptoms;
    } else if (message.includes('appointment') || message.includes('doctor') || message.includes('book')) {
      response = mockAIResponses.appointment;
    }

    return {
      id: Date.now(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date(),
      actionButtons: response.actionButtons
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse = generateResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(sendMessage, 100);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'hindi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        alert('Speech recognition error. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hindi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleActionButton = (action: string) => {
    switch (action) {
      case 'call-108':
        window.open('tel:108');
        break;
      case 'doctor-connect':
        alert('Connecting you with an on-call doctor...');
        break;
      default:
        onNavigate(action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
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

          {/* Language Selector */}
          <div className="flex gap-2">
            {['English', 'Hindi'].map((lang) => (
              <Button
                key={lang}
                variant={selectedLanguage === lang.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.toLowerCase())}
                className="rounded-lg"
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] border-0 shadow-lg rounded-xl flex flex-col">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-xl">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl text-gray-900">AI Health Assistant</h2>
                    <p className="text-sm text-gray-600">Available 24/7 for health guidance</p>
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary' 
                        : 'bg-secondary'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className={`flex-1 max-w-[80%] ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`p-3 rounded-xl ${
                        message.type === 'user'
                          ? 'bg-primary text-white ml-auto'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.type === 'assistant' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => speakMessage(message.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {message.actionButtons && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.actionButtons.map((button, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant={button.variant}
                              onClick={() => handleActionButton(button.action)}
                              className="rounded-lg"
                            >
                              {button.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="rounded-full text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about your health..."
                      className="pr-12 rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1 h-8 w-8 p-0 rounded-lg"
                      onClick={isListening ? stopListening : startListening}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Topics */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Quick Topics</CardTitle>
                <CardDescription>Common health questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {commonQuestions.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {category.category}
                    </Badge>
                    <div className="space-y-1">
                      {category.questions.slice(0, 2).map((question, qIndex) => (
                        <Button
                          key={qIndex}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuggestionClick(question)}
                          className="w-full text-left text-xs p-2 h-auto rounded-lg justify-start"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Health Stats */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Health Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Pill className="w-4 h-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">Medicine Due</p>
                    <p className="text-xs text-blue-600">Metformin - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">Appointment</p>
                    <p className="text-xs text-green-600">Dr. Smith - Tomorrow 3PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">Lab Report</p>
                    <p className="text-xs text-orange-600">Due for blood test</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Alert */}
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Emergency?</strong><br />
                For life-threatening situations, call 108 immediately or use our Emergency SOS.
                <div className="mt-2">
                  <Button
                    size="sm"
                    onClick={() => onNavigate('emergency-services')}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Emergency SOS
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}