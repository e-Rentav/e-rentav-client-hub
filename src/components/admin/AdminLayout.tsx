
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard';
import { ClientsSection } from './ClientsSection';
import { DocumentsSection } from './DocumentsSection';
import { NotificationsSection } from './NotificationsSection';

export const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientsSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'contracts':
        return <div className="p-6"><h2 className="text-2xl font-bold">Contratos</h2><p>Seção em desenvolvimento...</p></div>;
      case 'reports':
        return <div className="p-6"><h2 className="text-2xl font-bold">Relatórios</h2><p>Seção em desenvolvimento...</p></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Configurações</h2><p>Seção em desenvolvimento...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 bg-gray-50">
          <div className="p-6">
            <div className="mb-4">
              <SidebarTrigger className="md:hidden" />
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
