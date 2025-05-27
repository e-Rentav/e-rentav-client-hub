
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Send,
  Plus,
  Calendar,
  Users,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const NotificationsSection = () => {
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    recipients: 'all'
  });

  const notifications = [
    {
      id: 1,
      title: 'Lembrete: Documentos de Dezembro',
      message: 'Por favor, envie os documentos referentes ao mês de dezembro até o dia 10/01.',
      recipients: ['Tech Solutions Ltda', 'StartUp ABC'],
      sentDate: '02/01/2025',
      sentBy: 'Maria Santos',
      type: 'warning',
      status: 'Enviado'
    },
    {
      id: 2,
      title: 'Sistema em Manutenção',
      message: 'O sistema estará em manutenção no dia 05/01 das 2h às 4h da manhã.',
      recipients: 'Todos os clientes',
      sentDate: '30/12/2024',
      sentBy: 'João Silva',
      type: 'info',
      status: 'Enviado'
    },
    {
      id: 3,
      title: 'Parabéns! Documentos processados',
      message: 'Seus documentos de novembro foram processados com sucesso.',
      recipients: ['Inovação Digital'],
      sentDate: '28/12/2024',
      sentBy: 'Maria Santos',
      type: 'success',
      status: 'Enviado'
    }
  ];

  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e a mensagem.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Notificação enviada!",
      description: "A notificação foi enviada com sucesso para os destinatários selecionados.",
    });

    setNewNotification({
      title: '',
      message: '',
      recipients: 'all'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info':
        return <Bell className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const stats = {
    total: notifications.length,
    enviadas: notifications.filter(n => n.status === 'Enviado').length,
    pendentes: 0,
    abertas: notifications.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
        <p className="text-gray-600">Envie notificações e acompanhe o histórico de comunicações</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-erentav-primary">{stats.total}</p>
              </div>
              <Bell className="w-8 h-8 text-erentav-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enviadas</p>
                <p className="text-2xl font-bold text-green-600">{stats.enviadas}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendentes}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Abertura</p>
                <p className="text-2xl font-bold text-blue-600">87%</p>
              </div>
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nova Notificação */}
        <Card className="erentav-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-erentav-primary" />
              Nova Notificação
            </CardTitle>
            <CardDescription>
              Envie uma notificação personalizada para seus clientes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                placeholder="Digite o título da notificação"
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Mensagem</label>
              <Textarea
                placeholder="Digite a mensagem da notificação"
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Destinatários</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newNotification.recipients}
                onChange={(e) => setNewNotification({...newNotification, recipients: e.target.value})}
              >
                <option value="all">Todos os clientes</option>
                <option value="active">Apenas clientes ativos</option>
                <option value="pending">Apenas clientes pendentes</option>
                <option value="specific">Clientes específicos</option>
              </select>
            </div>
            
            <Button 
              className="w-full erentav-button"
              onClick={handleSendNotification}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Notificação
            </Button>
          </CardContent>
        </Card>

        {/* Notificações Automáticas */}
        <Card className="erentav-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-erentav-primary" />
              Notificações Automáticas
            </CardTitle>
            <CardDescription>
              Configure lembretes automáticos baseados em gatilhos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Lembrete de Upload</h4>
                <Badge variant="default">Ativo</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Enviar lembrete se o cliente não fez upload até o dia 10 do mês
              </p>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Confirmação de Recebimento</h4>
                <Badge variant="default">Ativo</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Confirmar automaticamente o recebimento de documentos
              </p>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Vencimento de Plano</h4>
                <Badge variant="secondary">Inativo</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Lembrar sobre vencimento do plano 5 dias antes
              </p>
              <Button variant="outline" size="sm">Ativar</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Notificações */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle>Histórico de Notificações</CardTitle>
          <CardDescription>
            Todas as notificações enviadas recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      
                      <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {notification.sentDate}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {Array.isArray(notification.recipients) 
                            ? `${notification.recipients.length} cliente(s)`
                            : notification.recipients
                          }
                        </div>
                        <div>
                          Por: {notification.sentBy}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{notification.status}</Badge>
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
