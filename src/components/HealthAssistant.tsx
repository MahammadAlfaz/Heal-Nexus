import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
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
  Activity,
  Play,
  Pause,
  Languages as LanguagesIcon
} from 'lucide-react';
import { queryAI } from '../utils/api';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
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

  const languageConfig = {
    english: { code: 'en-US', voice: 'en-US' },
    hindi: { code: 'hi-IN', voice: 'hi-IN' },
    kannada: { code: 'kn-IN', voice: 'kn-IN' },
    tamil: { code: 'ta-IN', voice: 'ta-IN' },
    telugu: { code: 'te-IN', voice: 'te-IN' },
    bengali: { code: 'bn-IN', voice: 'bn-IN' },
    marathi: { code: 'mr-IN', voice: 'mr-IN' },
    gujarati: { code: 'gu-IN', voice: 'gu-IN' },
    malayalam: { code: 'ml-IN', voice: 'ml-IN' }
  };

  const languages = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Malayalam'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Setup Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      // Don't alert on every recognition error, as it can be noisy.
      console.error(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, []);

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };
    // The 'voiceschanged' event is fired when the list of supported voices changes.
    speechSynthesis.addEventListener('voiceschanged', updateVoices);
    updateVoices(); // For browsers that load them synchronously.

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', updateVoices);
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Stop any currently playing audio before sending a new message
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    // Reset audio state
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingMessageId(null);

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await queryAI(currentInput, selectedLanguage);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(() => sendMessage(), 100); // Use a small delay to allow state update
  };

  const startListening = () => {
    if (recognitionRef.current) {
      const lang = languageConfig[selectedLanguage as keyof typeof languageConfig] || languageConfig.english;
      recognitionRef.current.lang = lang.code;
      try {
        recognitionRef.current.start();
      } catch (e) {
        // This can happen if recognition is already active.
        console.error("Speech recognition couldn't start:", e);
      }
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speakMessage = (messageId: number, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }

    let availableVoices = voices;
    if (availableVoices.length === 0) {
      availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    }

    if (speakingMessageId === messageId && speechSynthesis.speaking) {
      if (isPaused) {
        speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const langConfig = languageConfig[selectedLanguage as keyof typeof languageConfig] || languageConfig.english;
    utterance.lang = langConfig.code;

    // --- Voice Selection Logic ---
    // This logic attempts to find the best available voice for the selected language.
    const langCode = langConfig.code; // e.g., 'hi-IN'
    const langPrefix = langCode.split('-')[0]; // e.g., 'hi'

    // 1. Find an exact match for the language and region code.
    let voice = availableVoices.find(v => v.lang === langCode);

    // 2. If no exact match, find a voice that matches the language prefix.
    if (!voice) {
      voice = availableVoices.find(v => v.lang.startsWith(langPrefix));
    }

    // 3. If still no voice and the desired language is not English, fallback to an English voice.
    if (!voice && langPrefix !== 'en') {
      voice = availableVoices.find(v => v.lang.startsWith('en-'));
    }

    if (voice) {
      utterance.voice = voice;
      console.log(`Using voice: ${voice.name} (${voice.lang}) for language '${selectedLanguage}'`);
    } else {
      console.warn(`No specific voice found for '${selectedLanguage}'. The browser will use its default for lang '${langConfig.code}'.`);
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakingMessageId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingMessageId(null);
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      // The 'canceled' error is expected when we cancel speech, so we can ignore it.
      if (event.error !== 'canceled') {
        console.error(`An error occurred during speech synthesis: ${event.error}`);
      }
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingMessageId(null);
    };

    speechSynthesis.speak(utterance);
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
      <BreadcrumbNavigation userType={userType} onNavigate={onNavigate} />
      <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              onClick={() => {
                const currentUserType = userType || localStorage.getItem('userType');
                onNavigate(currentUserType === 'patient' ? 'patient-dashboard' : 'doctor-dashboard');
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex gap-2">
            {languages.map((lang) => (
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
          <div className="md:hidden w-full sm:w-auto">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-lg">
                <LanguagesIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-3">
            <Card className="h-[80vh] border-0 shadow-lg rounded-xl flex flex-col">
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
                            onClick={() => speakMessage(message.id, message.content)}
                            className="h-6 w-6 p-0"
                          >
                            {isSpeaking && speakingMessageId === message.id && !isPaused ? (
                              <Pause className="w-3 h-3" />
                            ) : isSpeaking && speakingMessageId === message.id && isPaused ? (
                              <Play className="w-3 h-3" />
                            ) : (
                              <Volume2 className="w-3 h-3" />
                            )}
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
                              variant={button.variant || 'default'}
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
                    disabled={!inputMessage.trim() || isTyping}
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
