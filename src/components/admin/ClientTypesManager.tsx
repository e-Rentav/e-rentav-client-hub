
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
  Building2,
  UserCheck,
  Briefcase,
  Calculator,
  TrendingUp
} from 'lucide-react';
import { Client, ClientType } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ClientTypesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ClientType | 'all'>('all');

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Carlos Oliveira',
      email: 'carlos@empresa.com',
      type: 'pessoa_fisica',
      company: 'Tech Solutions Ltda',
      plan: 'Anual',
      status: 'Ativo',
      documentsUploaded: 45,
      joinDate: '15/03/2024'
    },
    {
      id: '2',
      name: 'AAI Premium Investimentos',
      email: 'admin@aaipremium.com',
      type: 'escritorio_aai',
      company: 'AAI Premium Investimentos',
      cnpj: '12.345.678/0001-90',
      plan: 'Profissional',
      status: 'Ativo',
      documentsUploaded: 234,
      joinDate: '08/01/2024',
      clientsCount: 45,
      planLimit: 100,
      responsavel: 'Roberto Silva',
      telefone: '(11) 99999-9999'
    },
    {
      id: '3',
      name: 'Excellence Contabilidade',
      email: 'contato@contabilexcellence.com',
      type: 'escritorio_contabilidade',
      company: 'Excellence Contabilidade',
      cnpj: '98.765.432/0001-12',
      plan: 'Empresarial',
      status: 'Ativo',
      documentsUploaded: 567,
      joinDate: '22/11/2023',
      clientsCount: 78,
      planLimit: 150,
      responsavel: 'Ana Paula Costa',
      telefone: '(11) 88888-8888'
    }
  ];

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || client.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getClientTypeInfo = (type: ClientType) => {
    switch (type) {
      case 'pessoa_fisica':
        return { 
          label: 'Pessoa Física', 
          icon: UserCheck, 
          color: 'bg-blue-100 text-blue-800',
          bgColor: 'bg-blue-50 border-blue-200'
        };
      case 'escritorio_aai':
        return { 
          label: 'Escritório AAI', 
          icon: Briefcase, 
          color: 'bg-green-100 text-green-800',
          bgColor: 'bg-green-50 border-green-200'
        };
      case 'escritorio_contabilidade':
        return { 
          label: 'Escritório Contábil', 
          icon: Calculator, 
          color: 'bg-purple-100 text-purple-800',
          bgColor: 'bg-purple-50 border-purple-200'
        };
    }
  };

  const stats = {
    total: mockClients.length,
    pessoaFisica: mockClients.filter(c => c.type === 'pessoa_fisica').length,
    escritorioAAI: mockClients.filter(c => c.type === 'escritorio_aai').length,
    escritorioContabilidade: mockClients.filter(c => c.type === 'escritorio_contabilidade').length,
    totalClientsFromOffices: mockClients
      .filter(c => c.type !== 'pessoa_fisica')
      .reduce((sum, c) => sum + (c.clientsCount || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Clientes</h1>
          <p className="text-gray-600">Gerencie clientes PF, escritórios AAI e contábeis</p>
        </div>
        <Button className="erentav-button">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Geral</p>
                <p className="text-2xl font-bold text-erentav-primary">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-erentav-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pessoa Física</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pessoaFisica}</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Escritórios AAI</p>
                <p className="text-2xl font-bold text-green-600">{stats.escritorioAAI}</p>
              </div>
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Escritórios Contábeis</p>
                <p className="text-2xl font-bold text-purple-600">{stats.escritorioContabilidade}</p>
              </div>
              <Calculator className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Vinculados</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalClientsFromOffices}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
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
            <Select value={filterType} onValueChange={(value) => setFilterType(value as ClientType | 'all')}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
                <SelectItem value="escritorio_aai">Escritório AAI</SelectItem>
                <SelectItem value="escritorio_contabilidade">Escritório Contábil</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Mais Filtros</span>
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
            {filteredClients.map((client) => {
              const typeInfo = getClientTypeInfo(client.type);
              const TypeIcon = typeInfo.icon;
              
              return (
                <div key={client.id} className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${typeInfo.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={client.logo} />
                          <AvatarFallback className="bg-erentav-primary text-white">
                            {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1">
                          <TypeIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-0.5" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{client.name}</h3>
                          <Badge variant="outline" className={typeInfo.color}>
                            {typeInfo.label}
                          </Badge>
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
                            {client.company || client.name}
                            {client.cnpj && <span className="ml-2 text-xs">({client.cnpj})</span>}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{client.email}</span>
                            {client.telefone && <span>{client.telefone}</span>}
                            {client.responsavel && <span>Resp: {client.responsavel}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <p className="font-medium text-gray-900">
                          {client.documentsUploaded} docs
                        </p>
                        {client.clientsCount !== undefined && (
                          <p className="text-gray-600">
                            {client.clientsCount}/{client.planLimit} clientes
                          </p>
                        )}
                        <p className="text-gray-500 text-xs">
                          Desde {client.joinDate}
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
                          {client.type !== 'pessoa_fisica' && (
                            <DropdownMenuItem>Gerenciar Clientes</DropdownMenuItem>
                          )}
                          <DropdownMenuItem>Relatórios</DropdownMenuItem>
                          <DropdownMenuItem>Histórico</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
