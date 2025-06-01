import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { ClientRegistration } from './ClientRegistration';
import { CollaboratorRegistration } from './CollaboratorRegistration';
import { 
  Upload, 
  FileText, 
  Users,
  Bell,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  LogOut,
  Plus,
  BarChart3,
  Download,
  UserPlus
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const OfficeDashboard = () => {
  const { user, logout } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'client-registration' | 'collaborator-registration'>('dashboard');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simular upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Documento enviado com sucesso!",
      description: `${file.name} foi enviado para análise.`,
    });
    
    setUploading(false);
  };

  const planInfo = {
    type: user?.plan || 'Profissional',
    clientsUsed: 45,
    clientsLimit: 100,
    value: 'R$ 899,00',
    nextPayment: '15/01/2025',
    status: 'Ativo'
  };

  const officeStats = {
    totalClients: 45,
    activeClients: 42,
    pendingDocuments: 8,
    processedThisMonth: 156,
    newClientsThisMonth: 3
  };

  const recentActivity = [
    {
      id: 1,
      clientName: "João Silva",
      action: "Enviou relatório mensal",
      date: "2 horas atrás",
      status: "success"
    },
    {
      id: 2,
      clientName: "Maria Santos",
      action: "Documento pendente",
      date: "1 dia atrás", 
      status: "warning"
    },
    {
      id: 3,
      clientName: "Carlos Oliveira",
      action: "Relatório processado",
      date: "2 dias atrás",
      status: "success"
    }
  ];

  const getTypeLabel = () => {
    if (user?.clientType === 'escritorio_aai') return 'Agentes Autônomos de Investimentos';
    if (user?.clientType === 'escritorio_contabilidade') return 'Escritório de Contabilidade';
    return 'Escritório';
  };

  if (currentView === 'client-registration') {
    return <ClientRegistration onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'collaborator-registration') {
    return <CollaboratorRegistration onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/75f6e7da-3f6e-4269-b1ea-f48bd08979b2.png" 
                  alt="e-Rentav Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-erentav-primary">
                  {user?.company || 'Meu Escritório'}
                </h1>
                <p className="text-sm text-gray-600">{getTypeLabel()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.responsavel || user?.name}</p>
                <p className="text-sm text-gray-600">Administrador</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {user?.responsavel?.split(' ')[0] || user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">Gerencie seus clientes e acompanhe as atividades do seu escritório</p>
        </div>

        {/* Ações Rápidas - movido para cima */}
        <Card className="erentav-card mb-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Gerencie seus clientes e documentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="erentav-button h-16 flex-col"
                onClick={() => setCurrentView('client-registration')}
              >
                <Plus className="w-6 h-6 mb-1" />
                Novo Cliente
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col"
                onClick={() => setCurrentView('collaborator-registration')}
              >
                <UserPlus className="w-6 h-6 mb-1" />
                Cadastrar Colaborador
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Upload className="w-6 h-6 mb-1" />
                Enviar Documentos
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Download className="w-6 h-6 mb-1" />
                Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid - movido para baixo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="erentav-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                  <p className="text-2xl font-bold text-erentav-primary">{officeStats.totalClients}</p>
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
                  <p className="text-2xl font-bold text-green-600">{officeStats.activeClients}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="erentav-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendências</p>
                  <p className="text-2xl font-bold text-orange-600">{officeStats.pendingDocuments}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="erentav-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processados</p>
                  <p className="text-2xl font-bold text-blue-600">{officeStats.processedThisMonth}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="erentav-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Novos (mês)</p>
                  <p className="text-2xl font-bold text-purple-600">{officeStats.newClientsThisMonth}</p>
                </div>
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Atividade Recente */}
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-erentav-primary" />
                  Atividade Recente
                </CardTitle>
                <CardDescription>
                  Últimas ações dos seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {activity.status === 'success' ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Clock className="w-6 h-6 text-orange-500" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{activity.clientName}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do Plano */}
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-erentav-primary" />
                  Seu Plano
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-erentav-primary">{planInfo.type}</p>
                  <p className="text-lg font-semibold text-gray-900">{planInfo.value}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant="default">{planInfo.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Próximo pagamento:</span>
                    <span className="text-sm font-medium">{planInfo.nextPayment}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 mb-2">Clientes utilizados</p>
                  <Progress value={(planInfo.clientsUsed / planInfo.clientsLimit) * 100} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    {planInfo.clientsUsed} de {planInfo.clientsLimit} clientes
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Relatórios Rápidos */}
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-erentav-primary" />
                  Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Relatório Mensal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Lista de Clientes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Documentos Pendentes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
