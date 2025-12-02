import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, FileText, User, Upload, Scan, Bot, AlertTriangle, MapPin, Calendar, MessageCircle, Calculator, Car } from 'lucide-react';

interface BreadcrumbNavigationProps {
  userType: 'patient' | 'doctor' | 'admin' | null;
  activeSection?: string;
  onNavigate?: (page: string) => void;
}

export function BreadcrumbNavigation({ userType, activeSection, onNavigate }: BreadcrumbNavigationProps) {
  const location = useLocation();
  const routerNavigate = useNavigate();

  const navigate = onNavigate || ((path: string) => routerNavigate(path));

  // Define page titles and icons
  const pageConfig: Record<string, { title: string; icon: any }> = {
    '/': { title: 'Home', icon: Home },
    '/login': { title: 'Login', icon: null },
    '/signup': { title: 'Sign Up', icon: null },
    '/patient-dashboard': { title: 'Patient Dashboard', icon: LayoutDashboard },
    '/doctor-dashboard': { title: 'Doctor Dashboard', icon: LayoutDashboard },
    '/admin-dashboard': { title: 'Admin Dashboard', icon: LayoutDashboard },
    '/upload-report': { title: 'Upload Report', icon: Upload },
    '/view-report': { title: 'View Report', icon: FileText },
    '/emergency-services': { title: 'Emergency Services', icon: AlertTriangle },
    '/medicine-scanner': { title: 'Medicine Scanner', icon: Scan },
    '/health-assistant': { title: 'AI Health Assistant', icon: Bot },
    '/home-services': { title: 'Home Services', icon: Home },
    '/hospital-finder': { title: 'Find Hospitals', icon: MapPin },
    '/appointment-booking': { title: 'Book Appointment', icon: Calendar },
    '/community-support': { title: 'Community Support', icon: MessageCircle },
    '/cost-estimator': { title: 'Cost Estimator', icon: Calculator },
    '/pickup-service': { title: 'Pickup Service', icon: Car },
    '/emergency-response': { title: 'Emergency Response', icon: AlertTriangle },
    '/medicine-verification': { title: 'Medicine Verification', icon: Scan },
    '/report-analysis': { title: 'Report Analysis', icon: FileText },
    '/appointment-management': { title: 'Appointment Management', icon: Calendar },
    '/patient-monitoring': { title: 'Patient Monitoring', icon: User },
    '/telehealth-consultation': { title: 'Telehealth Consultation', icon: Bot },
    '/hospital-details': { title: 'Hospital Details', icon: MapPin },
    '/add-hospital': { title: 'Add Hospital', icon: MapPin },
    '/edit-hospital': { title: 'Edit Hospital', icon: MapPin },
  };

  // Define section titles for dashboard sections
  const sectionConfig: Record<string, { title: string; icon: any }> = {
    'dashboard': { title: 'Dashboard', icon: LayoutDashboard },
    'reports': { title: 'Medical Reports', icon: FileText },
    'profile': { title: 'Profile Settings', icon: User },
    'upload': { title: 'Upload Reports', icon: Upload },
    'hospital-management': { title: 'Hospital Management', icon: MapPin },
    'user-management': { title: 'User Management', icon: User },
  };

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];

    // Always start with Home for logged-in users
    if (userType && path !== '/') {
      items.push({
        label: 'Home',
        href: '/',
        icon: Home,
        isActive: false
      });
    }

    // Add dashboard if user is logged in and not on dashboard
    if (userType && !path.includes('-dashboard')) {
      const dashboardPath = userType === 'patient' ? '/patient-dashboard' :
                           userType === 'doctor' ? '/doctor-dashboard' : '/admin-dashboard';
      items.push({
        label: `${userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard`,
        href: dashboardPath,
        icon: LayoutDashboard,
        isActive: false
      });
    }

    // Add current page
    const currentPage = pageConfig[path];
    if (currentPage) {
      items.push({
        label: currentPage.title,
        href: path,
        icon: currentPage.icon,
        isActive: true
      });
    }

    // Add section if we're in a dashboard with active section
    if (activeSection && activeSection !== 'dashboard' && path.includes('-dashboard')) {
      const section = sectionConfig[activeSection];
      if (section) {
        // Replace the last item (dashboard) with dashboard + section
        if (items.length > 1) {
          items[items.length - 1] = {
            label: section.title,
            href: path,
            icon: section.icon,
            isActive: true
          };
        }
      }
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't show breadcrumbs on home, login, or signup pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <div className="hidden sm:block px-8 py-4 bg-white border-b border-gray-200">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(item.href)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
