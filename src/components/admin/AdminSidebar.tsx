
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Bell, 
  Settings, 
  Building2,
  LogOut,
  CreditCard,
  BarChart3
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      id: "dashboard"
    },
    {
      title: "Clientes",
      icon: Users,
      id: "clients"
    },
    {
      title: "Documentos",
      icon: FileText,
      id: "documents"
    },
    {
      title: "Contratos",
      icon: CreditCard,
      id: "contracts"
    },
    {
      title: "Notificações",
      icon: Bell,
      id: "notifications"
    },
    {
      title: "Relatórios",
      icon: BarChart3,
      id: "reports"
    },
  ];

  const adminOnlyItems = [
    {
      title: "Configurações",
      icon: Settings,
      id: "settings"
    }
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-erentav-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-erentav-primary">e-Rentav</h2>
            <p className="text-xs text-gray-500">Painel Administrativo</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminOnlyItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start"
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-erentav-primary text-white text-xs">
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-gray-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
