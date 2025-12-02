import { useState, useEffect } from 'react';
import { Button } from './ui/button';
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
  ChevronDown,
  ArrowUpRight,
  Target,
  Route,
  Truck,
  ShieldCheck,
  CreditCard,
  Eye,
  UserCheck,
  Clock,
  DollarSign,
  Camera,
  Brain,
  Search,
  BookOpen,
  Droplets,
  RadioIcon as Radio,
  Mic,
  MessageSquare,
  Headphones
} from 'lucide-react';

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
      image: 'https://images.unsplash.com/photo-1567711159688-55360e0cb093?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Emergency Route Finder',
      description: 'Real-time hospital navigation with bed availability and traffic optimization.',
      category: 'ROUTE',
      highlight: 'Saves 5-15 minutes'
    },
    {
      image: 'https://images.unsplash.com/photo-1611380245577-a2a758225f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Patient Pickup Service',
      description: 'Assisted transport for elderly and disabled patients to medical appointments.',
      category: 'PICKUP',
      highlight: 'Healthcare Support'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1664304339622-ccb9031b7373?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Emergency SOS System',
      description: 'Complete emergency response with first aid, ambulance, and location sharing.',
      category: 'SOS',
      highlight: '24/7 Response'
    }
  ];

  const verificationFeatures = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1661746485873-93651651e873?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Doctor Verification',
      description: 'NMC verified doctors with authentic credentials and patient reviews.',
      category: 'VERIFIED',
      highlight: 'Trust & Safety'
    },
    {
      image: 'https://images.unsplash.com/photo-1628372095387-017d1099fc19?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Hospital Integration',
      description: 'Seamless connection with hospital systems for unified patient records.',
      category: 'INTEGRATION',
      highlight: 'Digital Records'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1755994149244-d7887690b774?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Health Card Finder',
      description: 'Find hospitals accepting ABHA, Ayushman Bharat, and state health cards.',
      category: 'CARDS',
      highlight: 'Government Schemes'
    }
  ];

  const smartFeatures = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1679923913597-2848bb0acf0a?q=80&w=1203&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Cost Estimator',
      description: 'Transparent healthcare pricing across hospitals with insurance coverage info.',
      category: 'PRICING',
      highlight: 'Price Transparency'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1698421947098-d68176a8f5b2?q=80&w=752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'AI Medicine Scanner',
      description: 'Identify medicines, get usage instructions and side effect warnings.',
      category: 'AI SCAN',
      highlight: 'Medicine Safety'
    },
    {
      image: 'https://images.unsplash.com/photo-1589777479741-a9cf65c776fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Medicine Alert System',
      description: 'Critical medicine warnings with instant doctor connect for serious drugs.',
      category: 'ALERTS',
      highlight: 'Safety First'
    }
  ];

  const aiServices = [
    {
      image: 'https://images.unsplash.com/photo-1567333971983-7ba18485eaad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Unknown Medicine Handler',
      description: 'Professional guidance when AI cannot identify medicines or pills.',
      category: 'UNKNOWN',
      highlight: 'Pharmacist Connect'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1661436496016-5289374a0dc6?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Lab Report Explanation',
      description: 'AI-powered analysis of blood reports with simple, clear explanations.',
      category: 'LAB AI',
      highlight: 'Understand Results'
    },
    {
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'AI Health Assistant',
      description: 'Multilingual AI companion for health queries and lifestyle guidance.',
      category: 'AI CHAT',
      highlight: 'Voice & Text'
    }
  ];

  const homeServices = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1673953886001-f79dc47d1912?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Blood Sample Collection',
      description: 'Professional home blood collection with lab-quality results and reporting.',
      category: 'BLOOD',
      highlight: 'Lab Quality'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1663011454840-48f5fffb737b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Home ECG Services',
      description: 'Portable ECG testing with instant cardiologist review and emergency alerts.',
      category: 'ECG',
      highlight: 'Cardiac Care'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1671185352866-a12d29fa1139?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Medical Scans & Echo',
      description: 'Home ultrasound, portable scans, and diagnostic center bookings.',
      category: 'SCANS',
      highlight: 'Portable Testing'
    }
  ];

  const digitalServices = [
    {
      image: 'https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Smart Appointments',
      description: 'Integrated booking with reminders, cost info, and health card support.',
      category: 'BOOKING',
      highlight: 'Never Miss Again'
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1661550011562-537183c5670c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Medicine Delivery',
      description: 'Discounted medicines with home delivery and auto-refill subscriptions.',
      category: 'DELIVERY',
      highlight: 'Save & Subscribe'
    },
    {
      image: 'https://images.unsplash.com/photo-1641785990903-b9fd62b2770d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Community Support',
      description: 'Condition-specific groups with peer support and verified home remedies.',
      category: 'COMMUNITY',
      highlight: 'Peer Support'
    }
  ];

  const allFeatures = [
    ...emergencyFeatures,
    ...verificationFeatures,
    ...smartFeatures,
    ...aiServices,
    ...homeServices,
    ...digitalServices
  ];

  const stats = [
    { number: '50K+', label: 'ACTIVE USERS', icon: Users },
    { number: '500+', label: 'PROVIDERS', icon: Hospital },
    { number: '18', label: 'FEATURES', icon: Star },
    { number: '24/7', label: 'SUPPORT', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nike-Style Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center transform rotate-12">
                  <Activity className="w-6 h-6 text-white transform -rotate-12" />
                </div>
                <span className="text-2xl font-black text-black tracking-tight">HEAL NEXUS</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('emergency')}
                className="text-black font-medium hover:text-gray-600 transition-colors uppercase tracking-wider"
              >
                Emergency
              </button>
              <button 
                onClick={() => scrollToSection('ai-tools')}
                className="text-black font-medium hover:text-gray-600 transition-colors uppercase tracking-wider"
              >
                AI Tools
              </button>
              <button 
                onClick={() => scrollToSection('home-services')}
                className="text-black font-medium hover:text-gray-600 transition-colors uppercase tracking-wider"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('community')}
                className="text-black font-medium hover:text-gray-600 transition-colors uppercase tracking-wider"
              >
                Community
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-black font-medium hover:bg-gray-100"
                onClick={() => onNavigate('login')}
              >
                Login
              </Button>
              <Button 
                className="bg-black hover:bg-gray-800 text-white font-bold px-6 py-2 rounded-full"
                onClick={() => onNavigate('signup')}
              >
                Join Us
              </Button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('emergency')}
                className="block w-full text-left py-2 text-black font-medium hover:text-gray-600"
              >
                Emergency Services
              </button>
              <button 
                onClick={() => scrollToSection('ai-tools')}
                className="block w-full text-left py-2 text-black font-medium hover:text-gray-600"
              >
                AI Tools
              </button>
              <button 
                onClick={() => scrollToSection('home-services')}
                className="block w-full text-left py-2 text-black font-medium hover:text-gray-600"
              >
                Home Services
              </button>
              <div className="pt-4 border-t space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('login')}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-black text-white"
                  onClick={() => onNavigate('signup')}
                >
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gray-900/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 px-4 sm:px-0">
              <div className="inline-block">
                <Badge className="bg-black text-white px-4 py-2 text-sm font-bold tracking-wider rounded-none">
                  COMPLETE HEALTHCARE ECOSYSTEM
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-black leading-none tracking-tight">
                  WELCOME TO
                  <br />
                  <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  
                  </span>
                  <br />
                  HEAL NEXUS
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium max-w-full sm:max-w-lg">
                  All powerful features in one platform. Emergency care, AI tools,
                  home services, and complete digital health ecosystem.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full text-base sm:text-lg group"
                  onClick={() => onNavigate('signup')}
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-black text-black hover:bg-black hover:text-white font-bold px-6 py-3 rounded-full text-base sm:text-lg border-2"
                  onClick={() => scrollToSection('all-features')}
                >
                  Explore All Features
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 sm:pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center min-w-[80px]">
                    <div className="text-2xl sm:text-3xl font-black text-black">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative px-4 sm:px-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10 rounded-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare Professional"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute bottom-8 left-8 z-20 text-white">
                  <div className="text-xs sm:text-sm font-bold tracking-wider mb-2">All FEATURES</div>
                  <div className="text-xl sm:text-2xl font-black">Complete Healthcare</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section id="emergency" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-red-100 text-red-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              EMERGENCY CARE
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
              CRITICAL MOMENTS
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              When every second counts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {emergencyFeatures.map((feature, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black text-lg group-hover:text-gray-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    Emergency Healthcare Service
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification & Trust */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              TRUST & VERIFICATION
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
              VERIFIED HEALTHCARE
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Authentic providers, transparent pricing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {verificationFeatures.map((feature, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video shadow-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black text-lg group-hover:text-gray-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    Verified Healthcare Network
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Healthcare Tools */}
      <section id="ai-tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              SMART TOOLS
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
              INTELLIGENT FEATURES
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              AI-powered healthcare assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {smartFeatures.map((feature, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black text-xl group-hover:text-gray-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-100 text-indigo-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              AI SERVICES
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
              ADVANCED AI TOOLS
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Professional healthcare guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {aiServices.map((feature, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black text-lg group-hover:text-gray-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Services */}
      <section id="home-services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              HOME HEALTHCARE
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
              HOSPITAL AT HOME
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Professional care, delivered
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {homeServices.map((feature, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video shadow-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black text-lg group-hover:text-gray-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    Professional Home Service
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section id="community" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              DIGITAL ECOSYSTEM
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
              CONNECTED CARE
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Community, convenience, continuity
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {digitalServices.map((feature, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 text-xs font-bold rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black text-lg group-hover:text-gray-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    Digital Health Service
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features Overview */}
      <section id="all-features" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-4">
              COMPLETE ECOSYSTEM
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              All POWERFUL FEATURES
            </h2>
            <p className="text-lg text-gray-300 font-medium">
              Everything you need for complete healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFeatures.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group cursor-pointer" onClick={() => onNavigate('login')}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-400 tracking-wider mb-1">{feature.category}</div>
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-gray-300 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nike-Style CTA Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="space-y-8">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-bold tracking-wider rounded-none">
              MEMBER EXCLUSIVE
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tight">
              YOUR HEALTH,
              <br />
              OUR MISSION
            </h2>
            <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
              Join the healthcare revolution. Get exclusive access to  All premium features, 
              priority support, and cutting-edge AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-4 rounded-full text-lg"
                onClick={() => onNavigate('signup')}
              >
                Become a Member
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-4 rounded-full text-lg"
                onClick={() => onNavigate('login')}
              >
                Already a Member
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-white/20 rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-red-100 text-red-800 px-4 py-2 text-sm font-bold tracking-wider rounded-none mb-6">
                LIFE-SAVING TECHNOLOGY
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-black mb-6 tracking-tight">
                EVERY SECOND
                <br />
                MATTERS
              </h2>
              <p className="text-lg text-gray-600 font-medium mb-8 max-w-lg">
                From emergency route finding to AI medicine scanning, our platform 
                saves precious time when it matters most. Built for India's healthcare challenges.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="font-medium text-black">5-15 minutes saved in emergencies</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="font-medium text-black">Real-time bed availability tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="font-medium text-black">AI-powered medicine safety alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="font-medium text-black">24/7 emergency support system</span>
                </div>
              </div>
              <Button 
                className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-full"
                onClick={() => onNavigate('signup')}
              >
                Get Emergency Access
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
                alt="Emergency Healthcare"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-bold tracking-wider mb-2">EMERGENCY READY</div>
                <div className="text-2xl font-black">Save Lives, Save Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nike-Style Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-sm font-bold tracking-wider mb-6 text-gray-400">EMERGENCY SERVICES</h4>
              <div className="space-y-3">
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Route Finder</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Patient Pickup</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">SOS System</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">24/7 Support</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold tracking-wider mb-6 text-gray-400">AI TOOLS</h4>
              <div className="space-y-3">
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Medicine Scanner</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Health Assistant</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Lab Reports</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Cost Estimator</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold tracking-wider mb-6 text-gray-400">HOME SERVICES</h4>
              <div className="space-y-3">
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Blood Collection</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">ECG Services</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Medical Scans</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Medicine Delivery</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-bold tracking-wider text-gray-400">ABOUT HEAL</h4>
              <div className="space-y-3">
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Careers</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Investors</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Healthcare Partners</p>
                <p className="text-white hover:text-gray-300 cursor-pointer font-medium">Support</p>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs font-bold">in</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 font-medium">India</span>
            </div>
            <div className="text-sm text-gray-400 space-x-6">
              <span>© 2024 Heal Nexus, Inc. All rights reserved</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}