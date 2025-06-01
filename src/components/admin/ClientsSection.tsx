import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Filter,
  MoreHorizontal,
  Users,
  Mail,
  Phone,
  Building2,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminClientRegistration } from './AdminClientRegistration';

export const ClientsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClientRegistration, setShowClientRegistration] = useState(false);

  const clients = [
    {
      id: 1,
      name: 'Carlos Oliveira',
      email: 'carlos@empresa.com',
      company: 'Tech Solutions Ltda',
      phone: '(11) 99999-9999',
      plan: 'Anual',
      status: 'Ativo',
      lastActivity: '2 dias atrás',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      documentsUploaded: 45,
      joinDate: '15/03/2024'
    },
    {
      id: 2,
      name: 'Ana Silva',
      email: 'ana@inovacao.com',
      company: 'Inovação Digital',
      phone: '(11) 88888-8888',
      plan: 'Mensal',
      status: 'Ativo',
      lastActivity: '1 dia atrás',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      documentsUploaded: 23,
      joinDate: '08/07/2024'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      email: 'roberto@startup.com',
      company: 'StartUp ABC',
      phone: '(11) 77777-7777',
      plan: 'Trimestral',
      status: 'Pendente',
      lastActivity: '5 dias atrás',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      documentsUploaded: 12,
      joinDate: '22/11/2024'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showClientRegistration) {
    return (
      <AdminClientRegistration onBack={() => setShowClientRegistration(false)} />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie e acompanhe seus clientes</p>
        </div>
        <Button 
          className="erentav-button"
          onClick={() => setShowClientRegistration(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-erentav-primary">248</p>
              </div>
              <Users className="w-8 h-8 text-erentav-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-green-600">231</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Novos (mês)</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="erentav-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, empresa ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            {filteredClients.length} clientes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-erentav-primary text-white">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{client.name}</h3>
                        <Badge 
                          variant={client.status === 'Ativo' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {client.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {client.plan}
                        </Badge>
                      </div>
                      
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Building2 className="w-4 h-4 mr-2" />
                          {client.company}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {client.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {client.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p className="font-medium text-gray-900">{client.documentsUploaded} docs</p>
                      <p className="text-gray-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {client.lastActivity}
                      </p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Notificação</DropdownMenuItem>
                        <DropdownMenuItem>Histórico</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
