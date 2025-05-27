
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  FileText, 
  Calendar,
  Bell,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  LogOut,
  Building2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const [uploading, setUploading] = useState(false);

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
    type: user?.plan || 'Mensal',
    value: 'R$ 299,00',
    nextPayment: '15/01/2025',
    status: 'Ativo'
  };

  const notifications = [
    {
      id: 1,
      title: "Lembrete: Documentos de Dezembro",
      message: "Por favor, envie os documentos referentes ao mês de dezembro até o dia 10/01.",
      date: "2 dias atrás",
      type: "warning"
    },
    {
      id: 2,
      title: "Documentos processados",
      message: "Seus documentos de novembro foram processados com sucesso.",
      date: "5 dias atrás",
      type: "success"
    }
  ];

  const recentUploads = [
    {
      name: "relatorio_novembro.pdf",
      date: "28/12/2024",
      status: "Processado",
      size: "2.4 MB"
    },
    {
      name: "planilha_vendas.xlsx",
      date: "25/12/2024",
      status: "Em análise",
      size: "1.8 MB"
    },
    {
      name: "backup_sistema.csv",
      date: "20/12/2024",
      status: "Processado",
      size: "892 KB"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-erentav-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-erentav-primary">e-Rentav</h1>
                <p className="text-sm text-gray-600">Portal do Cliente</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.company}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Bem-vindo, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-gray-600">Gerencie seus documentos e acompanhe o status dos seus envios</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload de Documentos */}
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-erentav-primary" />
                  Enviar Documentos
                </CardTitle>
                <CardDescription>
                  Faça upload dos seus documentos para processamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-erentav-primary transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Arraste arquivos aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Suporte para PDF, Excel e CSV (máx. 10MB)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="file-upload">
                    <Button className="erentav-button" disabled={uploading}>
                      {uploading ? "Enviando..." : "Selecionar Arquivo"}
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Documentos Recentes */}
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-erentav-primary" />
                  Documentos Recentes
                </CardTitle>
                <CardDescription>
                  Seus últimos envios e status de processamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-erentav-primary" />
                        <div>
                          <p className="font-medium text-gray-900">{upload.name}</p>
                          <p className="text-sm text-gray-600">
                            {upload.date} • {upload.size}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={upload.status === 'Processado' ? 'default' : 'secondary'}
                        className="flex items-center space-x-1"
                      >
                        {upload.status === 'Processado' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{upload.status}</span>
                      </Badge>
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
                  <p className="text-xs text-gray-500 mb-2">Uso mensal</p>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">18 de 24 uploads utilizados</p>
                </div>
              </CardContent>
            </Card>

            {/* Notificações */}
            <Card className="erentav-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-erentav-primary" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      {notification.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {notification.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
