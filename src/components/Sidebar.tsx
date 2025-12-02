import { Button } from './ui/button';
import { cn } from './ui/utils';
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  User, 
  Search, 
  Users,
  LogOut,
  Activity,
  AlertTriangle,
  Scan,
  Bot,
  Home,
  MapPin,
  Calendar,
  MessageCircle,
  Calculator,
  Car,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  userType: 'patient' | 'doctor' | 'admin';
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ userType, activeSection, onSectionChange, onNavigate, onLogout }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const patientMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'section' },
    { id: 'emergency-services', label: 'Emergency SOS', icon: AlertTriangle, type: 'page' },
    { id: 'medicine-scanner', label: 'Medicine Scanner', icon: Scan, type: 'page' },
    { id: 'health-assistant', label: 'AI Assistant', icon: Bot, type: 'page' },
    { id: 'home-services', label: 'Home Services', icon: Home, type: 'page' },
    { id: 'hospital-finder', label: 'Find Hospitals', icon: MapPin, type: 'page' },
    { id: 'appointment-booking', label: 'Appointments', icon: Calendar, type: 'page' },
    { id: 'pickup-service', label: 'Pickup Service', icon: Car, type: 'page' },
    { id: 'cost-estimator', label: 'Cost Estimator', icon: Calculator, type: 'page' },
    { id: 'community-support', label: 'Community', icon: MessageCircle, type: 'page' },
    { id: 'upload', label: 'Upload Reports', icon: Upload, type: 'section' },
    { id: 'reports', label: 'View Reports', icon: FileText, type: 'section' },
    { id: 'profile', label: 'Profile', icon: User, type: 'section' },
  ];

  const doctorMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'section' },
    { id: 'emergency-response', label: 'Emergency Response', icon: AlertTriangle, type: 'page' },
    { id: 'medicine-verification', label: 'Medicine Verification', icon: Scan, type: 'page' },
    { id: 'report-analysis', label: 'AI Report Analysis', icon: Bot, type: 'page' },
    { id: 'appointment-management', label: 'Appointment Mgmt', icon: Calendar, type: 'page' },
    { id: 'telehealth-consultation', label: 'Telehealth Console', icon: Activity, type: 'page' },
    { id: 'patient-monitoring', label: 'Patient Monitoring', icon: Users, type: 'page' },
    { id: 'search', label: 'Patient Search', icon: Search, type: 'section' },
    { id: 'reports', label: 'Reports', icon: FileText, type: 'section' },
    { id: 'patients', label: 'My Patients', icon: Users, type: 'section' },
    { id: 'profile', label: 'Profile', icon: User, type: 'section' },
  ];

  const menuItems = userType === 'patient' ? patientMenuItems : doctorMenuItems;

  const handleMenuClick = (item: any) => {
    if (item.id === 'dashboard') {
      // Map dashboard to correct page based on userType
      const dashboardPage = userType === 'patient' ? 'patient-dashboard' : userType === 'doctor' ? 'doctor-dashboard' : 'admin-dashboard';
      onNavigate(dashboardPage);
    } else if (item.type === 'page') {
      onNavigate(item.id);
    } else {
      // For upload section, navigate to upload page instead of changing section
      if (item.id === 'upload') {
        onNavigate('upload-report');
      } else {
        onSectionChange(item.id);
      }
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base text-gray-900">Heal Nexus</h2>
            <p className="text-xs text-gray-500 capitalize">{userType} Portal</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 text-gray-600 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col transition-transform duration-200 ease-in-out",
        "md:static md:translate-x-0 md:w-64",
        "fixed top-0 left-0 z-50 w-64",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header - Desktop Only */}
        <div className="hidden md:block p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Heal Nexus</h2>
              <p className="text-sm text-gray-500 capitalize">{userType} Portal</p>
            </div>
          </div>
        </div>

        {/* Mobile Header Inside Sidebar */}
        <div className="md:hidden p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base text-gray-900">Heal Nexus</h2>
              <p className="text-xs text-gray-500 capitalize">{userType} Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 rounded-xl py-3 text-sm",
                activeSection === item.id 
                  ? "bg-black text-white shadow-lg" 
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              )}
              onClick={() => handleMenuClick(item)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
}