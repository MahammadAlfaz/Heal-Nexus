import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { AdminSidebar } from './AdminSidebar';

interface LayoutWithSidebarProps {
  children: ReactNode;
  userType: 'patient' | 'doctor' | 'admin' | null;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: string, data?: any) => void;
  onLogout: () => void;
}

export function LayoutWithSidebar({
  children,
  userType,
  activeSection,
  onSectionChange,
  onNavigate,
  onLogout,
}: LayoutWithSidebarProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {userType === 'admin' ? (
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      ) : (
        <Sidebar
          userType={userType || 'doctor'}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      )}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
