import { Button } from './ui/button';
import { cn } from './ui/utils';
import {
  LayoutDashboard,
  Building2,
  UserCheck,
  Users,
  BarChart3,
  Settings,
  AlertTriangle,
  Database,
  Shield,
  Bell,
  LogOut,
  Menu,
  X,
  Activity,
  Pill,
  FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, onNavigate, onLogout }: AdminSidebarProps) {
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

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'section' },
    { id: 'hospital-management', label: 'Hospital Management', icon: Building2, type: 'section' },
    { id: 'doctor-verification', label: 'Doctor Verification', icon: UserCheck, type: 'section' },
    { id: 'user-management', label: 'User Management', icon: Users, type: 'section' },
    { id: 'medicine-database', label: 'Medicine Database', icon: Pill, type: 'section' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, type: 'section' },
    { id: 'emergency-coordination', label: 'Emergency Center', icon: AlertTriangle, type: 'section' },
    { id: 'content-management', label: 'Content Management', icon: FileText, type: 'section' },
    { id: 'system-settings', label: 'System Settings', icon: Settings, type: 'section' },
    { id: 'security', label: 'Security', icon: Shield, type: 'section' },
    { id: 'notifications', label: 'Notifications', icon: Bell, type: 'section' },
    { id: 'data-management', label: 'Data Management', icon: Database, type: 'section' },
  ];

  const handleMenuClick = (item: any) => {
    if (item.type === 'page') {
      onNavigate(item.id);
    } else {
      onSectionChange(item.id);
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
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base text-gray-900">Heal Nexus</h2>
            <p className="text-xs text-gray-500">Admin Portal</p>
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Heal Nexus</h2>
              <p className="text-sm text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Mobile Header Inside Sidebar */}
        <div className="md:hidden p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base text-gray-900">Heal Nexus</h2>
              <p className="text-xs text-gray-500">Admin Portal</p>
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
          {adminMenuItems.map((item) => (
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
