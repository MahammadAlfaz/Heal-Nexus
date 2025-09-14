import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  FileText, 
  Users, 
  Cloud, 
  Mail, 
  Phone, 
  MapPin,
  AlertTriangle,
  Scan,
  Bot,
  Home,
  Calendar,
  Car,
  Calculator,
  MessageCircle,
  Stethoscope,
  Activity,
  Heart,
  Pill,
  Hospital,
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  Play,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const emergencyFeatures = [
    {
      icon: AlertTriangle,
      title: 'Emergency SOS',
      description: 'Instant emergency alert system with GPS location sharing to nearby healthcare providers.',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: MapPin,
      title: 'Shortest Route Finder',
      description: 'Find the fastest route to the nearest hospital or emergency care facility.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Car,
      title: 'Patient Pickup Service',
      description: 'Emergency ambulance and non-emergency medical transport services.',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const aiFeatures = [
    {
      icon: Scan,
      title: 'Medicine Scanner',
      description: 'AI-powered medicine identification with interaction alerts and dosage information.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Bot,
      title: 'Health Assistant',
      description: 'AI-powered health assistant for symptom checking and medical guidance.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: FileText,
      title: 'Lab Report Explanation',
      description: 'AI-driven analysis and explanation of your medical lab reports.',
      color: 'text-teal-500',
      bgColor: 'bg-teal-50'
    }
  ];

  const homeServices = [
    {
      icon: Activity,
      title: 'Blood Sample Collection',
      description: 'Professional blood collection services at your home with lab-quality results.',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Heart,
      title: 'Home ECG Services',
      description: 'Cardiac monitoring and ECG testing from the comfort of your home.',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Stethoscope,
      title: 'Medical Scans',
      description: 'Portable diagnostic imaging and health screening services.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    }
  ];

  const hospitalIntegration = [
    {
      icon: Shield,
      title: 'Doctor Verification',
      description: 'Verified healthcare professionals with authentic credentials and reviews.',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Calculator,
      title: 'Cost Estimator',
      description: 'Transparent pricing for medical procedures and treatments across providers.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Calendar,
      title: 'Appointment Booking',
      description: 'Seamless appointment scheduling with doctors and healthcare facilities.',
      color: 'text-primary',
      bgColor: 'bg-blue-50'
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageCircle,
      title: 'Community Support',
      description: 'Connect with patients, share experiences, and get peer support.',
      color: 'text-secondary',
      bgColor: 'bg-green-50'
    },
    {
      icon: Pill,
      title: 'Medicine Delivery',
      description: 'Fast and reliable prescription medication delivery to your doorstep.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Cloud,
      title: 'Secure Cloud Storage',
      description: 'Bank-level security for all your medical records and health data.',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '500+', label: 'Healthcare Providers', icon: Hospital },
    { number: '98%', label: 'User Satisfaction', icon: Star },
    { number: '24/7', label: 'Emergency Support', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900 tracking-tight">Heal-Nexus-Hub</h2>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Home
              </button>
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors duration-200">
                  Features
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 space-y-2">
                    <button 
                      onClick={() => scrollToSection('emergency')}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Emergency Services
                    </button>
                    <button 
                      onClick={() => scrollToSection('ai-tools')}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      AI-Powered Tools
                    </button>
                    <button 
                      onClick={() => scrollToSection('home-services')}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Home Healthcare
                    </button>
                    <button 
                      onClick={() => scrollToSection('hospital')}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Hospital Integration
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl"
                onClick={() => onNavigate('login')}
              >
                Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => onNavigate('signup')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('emergency')}
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                Emergency Services
              </button>
              <button 
                onClick={() => scrollToSection('ai-tools')}
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                AI Tools
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                About
              </button>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl"
                  onClick={() => onNavigate('signup')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Enhanced Design */}
      <section id="hero" className="relative px-4 py-32 md:py-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-purple-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-100 rounded-full blur-3xl animate-bounce delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 px-6 py-3 rounded-full text-lg animate-bounce">
                  🏥 Complete Healthcare Solution
                </Badge>
                <h1 className="text-6xl md:text-8xl text-gray-900 tracking-tight leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-primary via-secondary to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Heal-Nexus-Hub
                  </span>
                </h1>
                <p className="text-2xl text-gray-600 max-w-lg leading-relaxed">
                  Your comprehensive healthcare platform with 18+ features including emergency services, 
                  AI-powered tools, home healthcare, and seamless doctor-patient collaboration.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                  onClick={() => onNavigate('signup')}
                >
                  <Play className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Get Started as Patient
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/30 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm transform hover:scale-105"
                  onClick={() => onNavigate('signup')}
                >
                  Healthcare Professional
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">{stat.number}</div>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-3xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-3xl max-w-lg transform group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1659353887019-b142198f2668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGRvY3RvciUyMHBhdGllbnR8ZW58MXx8fHwxNzU3NDY5NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Healthcare Technology"
                    className="w-full h-auto relative z-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Section */}
      <section id="emergency" className="px-4 py-24 bg-gradient-to-br from-red-50/50 to-orange-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-red-50 text-red-600 border-red-200 px-6 py-3 rounded-full text-lg">
              🚨 Emergency Services
            </Badge>
            <h2 className="text-5xl md:text-6xl text-gray-900 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Emergency Care When You Need It Most
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Instant access to emergency services with GPS tracking, route optimization, and professional transport.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {emergencyFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl group overflow-hidden transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6 relative">
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`mx-auto w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className={`w-12 h-12 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Tools Section */}
      <section id="ai-tools" className="px-4 py-24 bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-purple-50 text-purple-600 border-purple-200 px-6 py-3 rounded-full text-lg">
              🤖 AI-Powered Tools
            </Badge>
            <h2 className="text-5xl md:text-6xl text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Healthcare with AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Advanced AI tools for medicine identification, health assistance, and lab report analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl group overflow-hidden transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6 relative">
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`mx-auto w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className={`w-12 h-12 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Home Healthcare Services */}
      <section id="home-services" className="px-4 py-24 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-green-50 text-green-600 border-green-200 px-6 py-3 rounded-full text-lg">
              🏠 Home Healthcare
            </Badge>
            <h2 className="text-5xl md:text-6xl text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Professional Healthcare at Home
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Bring hospital-quality healthcare services to the comfort of your home.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {homeServices.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl group overflow-hidden transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6 relative">
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`mx-auto w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className={`w-12 h-12 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Integration */}
      <section id="hospital" className="px-4 py-24 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-6 py-3 rounded-full text-lg">
              🏥 Hospital Integration
            </Badge>
            <h2 className="text-5xl md:text-6xl text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Seamless Healthcare Network
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with verified doctors, transparent pricing, and easy appointment booking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {hospitalIntegration.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl group overflow-hidden transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6 relative">
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`mx-auto w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className={`w-12 h-12 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section id="about" className="px-4 py-24 bg-gradient-to-br from-orange-50/50 to-amber-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-orange-50 text-orange-600 border-orange-200 px-6 py-3 rounded-full text-lg">
              ✨ Additional Features
            </Badge>
            <h2 className="text-5xl md:text-6xl text-gray-900 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Complete Healthcare Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Community support, medicine delivery, and secure cloud storage for a complete healthcare experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl group overflow-hidden transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6 relative">
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`mx-auto w-24 h-24 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className={`w-12 h-12 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-purple-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-6xl text-white leading-tight">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of patients and healthcare providers who trust Heal-Nexus-Hub 
            for their comprehensive healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 text-xl"
              onClick={() => onNavigate('signup')}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-6 rounded-2xl transition-all duration-500 transform hover:scale-105 text-xl"
              onClick={() => onNavigate('login')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer id="contact" className="bg-gray-900 px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-3xl flex items-center justify-center">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl text-white">Heal-Nexus-Hub</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing healthcare with comprehensive digital solutions for patients and providers.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl text-white">Services</h4>
              <div className="space-y-3">
                <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">Emergency Services</p>
                <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">AI Health Assistant</p>
                <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home Healthcare</p>
                <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">Medicine Delivery</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                  <span>support@heal-nexus-hub.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5" />
                  <span>123 Healthcare Ave, Medical City</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl text-white">Follow Us</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="rounded-2xl border-gray-600 text-gray-400 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="rounded-2xl border-gray-600 text-gray-400 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300">
                  Twitter
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Heal-Nexus-Hub. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}