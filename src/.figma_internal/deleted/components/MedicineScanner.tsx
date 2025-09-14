import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Scan,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  FileImage,
  Volume2,
  RefreshCw,
  Shield,
  Pill,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  Settings,
  Languages
} from 'lucide-react';

interface MedicineScannerProps {
  onNavigate: (page: string) => void;
  userType: 'patient' | 'doctor' | null;
}

export function MedicineScanner({ onNavigate, userType }: MedicineScannerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const criticalMedicines = [
    'Warfarin', 'Digoxin', 'Methotrexate', 'Lithium', 'Insulin',
    'Chemotherapy drugs', 'Psychiatric medications', 'Heart medications'
  ];

  const mockScanResults = {
    paracetamol: {
      name: 'Paracetamol',
      brandName: 'Crocin 650mg',
      generic: 'Acetaminophen',
      category: 'Pain Reliever / Fever Reducer',
      isCritical: false,
      uses: ['Headache relief', 'Fever reduction', 'Body pain', 'Cold symptoms'],
      dosage: 'Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.',
      sideEffects: {
        common: ['Mild nausea', 'Stomach upset'],
        serious: ['Liver damage (with overdose)', 'Skin rash', 'Difficulty breathing']
      },
      warnings: [
        'Do not exceed recommended dose',
        'Avoid alcohol while taking this medicine',
        'Consult doctor if symptoms persist beyond 3 days'
      ],
      foodInstructions: 'Can be taken with or without food'
    },
    metformin: {
      name: 'Metformin',
      brandName: 'Glucophage 500mg',
      generic: 'Metformin HCl',
      category: 'Diabetes Medication',
      isCritical: true,
      uses: ['Type 2 Diabetes management', 'Blood sugar control'],
      dosage: 'As prescribed by doctor. Usually 1-2 tablets twice daily with meals.',
      sideEffects: {
        common: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
        serious: ['Lactic acidosis', 'Severe diarrhea', 'Breathing problems']
      },
      warnings: [
        'CRITICAL: Take only as prescribed by doctor',
        'Regular blood sugar monitoring required',
        'Inform all doctors about this medication'
      ],
      foodInstructions: 'Take with meals to reduce stomach upset'
    },
    unknown: {
      name: 'Unknown Medicine',
      isUnknown: true
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setScanResult(null);
    }
  };

  const scanMedicine = async () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate AI scanning process
    setTimeout(() => {
      const randomResult = Math.random();
      if (randomResult < 0.4) {
        setScanResult(mockScanResults.paracetamol);
      } else if (randomResult < 0.7) {
        setScanResult(mockScanResults.metformin);
      } else {
        setScanResult(mockScanResults.unknown);
      }
      setIsScanning(false);
    }, 3000);
  };

  const retakeScan = () => {
    setSelectedImage(null);
    setScanResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const languageConfig = {
    english: { code: 'en-US', voice: 'en-US' },
    hindi: { code: 'hi-IN', voice: 'hi-IN' },
    kannada: { code: 'kn-IN', voice: 'kn-IN' },
    tamil: { code: 'ta-IN', voice: 'ta-IN' },
    telugu: { code: 'te-IN', voice: 'te-IN' },
    bengali: { code: 'bn-IN', voice: 'bn-IN' },
    marathi: { code: 'mr-IN', voice: 'mr-IN' },
    gujarati: { code: 'gu-IN', voice: 'gu-IN' }
  };

  const speakText = (text: string, section?: string) => {
    if (!isAudioEnabled || !('speechSynthesis' in window) || !text) return;
    
    try {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const lang = languageConfig[selectedLanguage as keyof typeof languageConfig] || languageConfig.english;
      
      // Limit text length to prevent long audio
      const limitedText = text.length > 500 ? text.substring(0, 500) + '...' : text;
      
      const utterance = new SpeechSynthesisUtterance(limitedText);
      utterance.lang = lang.code;
      utterance.rate = audioSpeed;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Add section-specific announcements
      if (section) {
        const announcement = getAudioAnnouncement(section);
        const announcementUtterance = new SpeechSynthesisUtterance(announcement);
        announcementUtterance.lang = lang.code;
        announcementUtterance.rate = audioSpeed;
        speechSynthesis.speak(announcementUtterance);
        
        // Use a shorter timeout
        setTimeout(() => {
          speechSynthesis.speak(utterance);
        }, 300);
      } else {
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const getAudioAnnouncement = (section: string) => {
    const announcements = {
      dosage: "Now reading dosage instructions",
      sideEffects: "Now reading side effects information",
      warnings: "Now reading important warnings",
      uses: "Now reading medicine uses",
      details: "Now reading medicine details",
      food: "Now reading food instructions"
    };
    return announcements[section as keyof typeof announcements] || "Now reading information";
  };

  const speakFullInformation = () => {
    if (!scanResult || scanResult.isUnknown || !isAudioEnabled) return;
    
    try {
      const fullText = `
        Medicine information for ${scanResult.brandName}. 
        Generic name: ${scanResult.generic}. 
        Category: ${scanResult.category}. 
        ${scanResult.isCritical ? 'This is a critical medicine requiring medical supervision.' : ''}
        Uses: ${scanResult.uses.join(', ')}. 
        Dosage instructions: ${scanResult.dosage}. 
        Food instructions: ${scanResult.foodInstructions}.
      `;
      
      // Keep the text shorter for full information to prevent timeouts
      speakText(fullText.trim());
    } catch (error) {
      console.error('Error in full information speech:', error);
    }
  };

  const connectWithDoctor = () => {
    alert('Connecting you with an on-call doctor for medicine consultation...');
    // In real implementation, this would connect to telemedicine service
  };

  const connectWithPharmacist = () => {
    alert('Connecting you with a licensed pharmacist...');
    // In real implementation, this would connect to pharmacy chat service
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
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

        <div className="space-y-2">
          <h1 className="text-3xl text-gray-900">AI Medicine Scanner</h1>
          <p className="text-gray-600">
            Scan medicine strips to get detailed information and safety alerts
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scanner Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="w-5 h-5" />
                  Medicine Scanner
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the medicine strip or tablet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <div className="space-y-4">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                      <div className="space-y-2">
                        <p className="text-gray-900">Upload Medicine Image</p>
                        <p className="text-sm text-gray-600">
                          Take a clear photo showing the medicine name and details
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-primary hover:bg-primary/90 text-white rounded-xl"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-xl"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border">
                      <img
                        src={selectedImage}
                        alt="Medicine to scan"
                        className="w-full h-64 object-cover"
                      />
                      {isScanning && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="text-center text-white">
                            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                            <p>Scanning medicine...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={scanMedicine}
                        disabled={isScanning}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl"
                      >
                        {isScanning ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Scan className="w-4 h-4 mr-2" />
                            Scan Medicine
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={retakeScan}
                        className="rounded-xl"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Retake
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                />
              </CardContent>
            </Card>

            {/* Scan Results */}
            {scanResult && (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Scan Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {scanResult.isUnknown ? (
                    <div className="space-y-6">
                      <Alert className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          <strong>Unknown Medicine Detected</strong><br />
                          This medicine could not be identified in our database. Please consult a pharmacist or doctor before taking it.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          onClick={connectWithPharmacist}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6"
                        >
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Ask Pharmacist
                        </Button>
                        <Button
                          onClick={connectWithDoctor}
                          className="bg-green-500 hover:bg-green-600 text-white rounded-xl py-6"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Consult Doctor
                        </Button>
                        <Button
                          onClick={retakeScan}
                          variant="outline"
                          className="rounded-xl py-6"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Retry Scan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Critical Medicine Alert */}
                      {scanResult.isCritical && (
                        <Alert className="border-red-200 bg-red-50">
                          <Shield className="w-4 h-4 text-red-600" />
                          <AlertDescription className="text-red-800">
                            <strong>⚠️ CRITICAL MEDICINE ALERT</strong><br />
                            This medicine requires strict medical supervision. Only take as prescribed by your doctor.
                            <div className="mt-3">
                              <Button
                                onClick={connectWithDoctor}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                size="sm"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Connect with Doctor Now
                              </Button>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Medicine Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                              Medicine Details
                              {isAudioEnabled && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => speakText(`Brand name: ${scanResult.brandName}. Generic name: ${scanResult.generic}. Category: ${scanResult.category}`, 'details')}
                                  className="p-1 h-6 w-6 rounded"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </Button>
                              )}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Brand Name:</span>
                                <span className="font-medium">{scanResult.brandName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Generic Name:</span>
                                <span className="font-medium">{scanResult.generic}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <Badge variant="outline">{scanResult.category}</Badge>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Uses</h3>
                            <ul className="space-y-1">
                              {scanResult.uses.map((use: string, index: number) => (
                                <li key={index} className="text-sm text-gray-600 flex gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {use}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                              Dosage Instructions
                              {isAudioEnabled && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => speakText(scanResult.dosage, 'dosage')}
                                  className="p-1 h-6 w-6 rounded"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </Button>
                              )}
                            </h3>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                              {scanResult.dosage}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                              Food Instructions
                              {isAudioEnabled && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => speakText(scanResult.foodInstructions, 'food')}
                                  className="p-1 h-6 w-6 rounded"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </Button>
                              )}
                            </h3>
                            <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                              {scanResult.foodInstructions}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Side Effects */}
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          Side Effects
                          {isAudioEnabled && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => speakText(`Common side effects: ${scanResult.sideEffects.common.join(', ')}. Serious side effects: ${scanResult.sideEffects.serious.join(', ')}`, 'sideEffects')}
                              className="p-1 h-6 w-6 rounded"
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                          )}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-yellow-50 p-4 rounded-xl">
                            <h4 className="font-medium text-yellow-800 mb-2">Common Side Effects</h4>
                            <ul className="space-y-1">
                              {scanResult.sideEffects.common.map((effect: string, index: number) => (
                                <li key={index} className="text-sm text-yellow-700">• {effect}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-50 p-4 rounded-xl">
                            <h4 className="font-medium text-red-800 mb-2">Serious Side Effects</h4>
                            <ul className="space-y-1">
                              {scanResult.sideEffects.serious.map((effect: string, index: number) => (
                                <li key={index} className="text-sm text-red-700">• {effect}</li>
                              ))}
                            </ul>
                            <p className="text-xs text-red-600 mt-2">
                              Contact doctor immediately if you experience these
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Warnings */}
                      <div className="bg-orange-50 p-4 rounded-xl">
                        <h3 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Important Warnings
                          {isAudioEnabled && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => speakText(`Important warnings: ${scanResult.warnings.join('. ')}`, 'warnings')}
                              className="p-1 h-6 w-6 rounded border-orange-300 hover:bg-orange-100"
                            >
                              <Volume2 className="w-3 h-3 text-orange-600" />
                            </Button>
                          )}
                        </h3>
                        <ul className="space-y-2">
                          {scanResult.warnings.map((warning: string, index: number) => (
                            <li key={index} className="text-sm text-orange-700 flex gap-2">
                              <span className="font-medium">•</span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Audio & Language Settings */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Audio & Language Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Audio Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Audio Explanations</span>
                  <Button
                    size="sm"
                    variant={isAudioEnabled ? "default" : "outline"}
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className="w-12 h-8"
                  >
                    {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Audio Speed */}
                {isAudioEnabled && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Audio Speed</label>
                    <div className="flex gap-2">
                      {[0.75, 1, 1.25, 1.5].map((speed) => (
                        <Button
                          key={speed}
                          size="sm"
                          variant={audioSpeed === speed ? "default" : "outline"}
                          onClick={() => setAudioSpeed(speed)}
                          className="flex-1 text-xs"
                        >
                          {speed}x
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati'].map((lang) => (
                      <Button
                        key={lang}
                        size="sm"
                        variant={selectedLanguage === lang.toLowerCase() ? "default" : "outline"}
                        className="text-xs"
                        onClick={() => setSelectedLanguage(lang.toLowerCase())}
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Full Audio Playback */}
                {scanResult && !scanResult.isUnknown && isAudioEnabled && (
                  <Button
                    onClick={speakFullInformation}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Full Information
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={connectWithDoctor}
                >
                  <Phone className="w-4 h-4" />
                  Consult Doctor
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={connectWithPharmacist}
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Pharmacist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 rounded-xl"
                  onClick={() => onNavigate('upload-report')}
                >
                  <FileImage className="w-4 h-4" />
                  Upload Prescription
                </Button>
              </CardContent>
            </Card>

            {/* Safety Reminder */}
            <Card className="border-0 shadow-lg rounded-xl bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Safety First</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-blue-700">
                <p className="text-sm">• Always consult a doctor before taking new medicines</p>
                <p className="text-sm">• Keep medicines in original packaging</p>
                <p className="text-sm">• Check expiry dates before taking</p>
                <p className="text-sm">• Store medicines as instructed</p>
                <p className="text-sm">• Never share prescription medicines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}