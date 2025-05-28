
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Send,
  Plus,
  Calendar,
  Users,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const NotificationsSection = () => {
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    recipients: 'all'
  });

  const [automatedReminders, setAutomatedReminders] = useState([
    {
      id: 1,
      name: 'Lembrete Mensal - Documentação',
      description: 'Enviar lembrete automático do dia 1º até o envio dos documentos',
      active: true,
      trigger: 'monthly_start',
      template: 'Não se esqueça de enviar seus documentos do mês atual. Acesse a plataforma e faça o upload.',
      frequency: 'daily'
    },
    {
      id: 2,
      name: 'Lembrete de Prazo Final',
      description: 'Lembrete 3 dias antes do prazo final',
      active: true,
      trigger: 'deadline_approach',
      template: 'Atenção! Restam apenas 3 dias para o envio dos documentos. Não perca o prazo!',
      frequency: 'once'
    },
    {
      id: 3,
      name: 'Confirmação de Recebimento',
      description: 'Confirmar automaticamente o recebimento de documentos',
      active: true,
      trigger: 'document_uploaded',
      template: 'Documentos recebidos com sucesso! Eles estão sendo processados pela nossa equipe.',
      frequency: 'immediate'
    },
    {
      id: 4,
      name: 'Documentos Pendentes',
      description: 'Lembrete semanal para clientes com documentos pendentes',
      active: false,
      trigger: 'weekly_pending',
      template: 'Você ainda possui documentos pendentes. Acesse a plataforma para regularizar sua situação.',
      frequency: 'weekly'
    }
  ]);

  const notifications = [
    {
      id: 1,
      title: 'Lembrete Automático: Documentos Janeiro',
      message: 'Lembrete automático enviado para clientes sobre documentos de janeiro.',
      recipients: 'Todos os clientes ativos (142)',
      sentDate: '01/01/2025',
      sentBy: 'Sistema Automático',
      type: 'auto',
      status: 'Enviado'
    },
    {
      id: 2,
      title: 'Lembrete: Documentos de Dezembro',
      message: 'Por favor, envie os documentos referentes ao mês de dezembro até o dia 10/01.',
      recipients: ['Tech Solutions Ltda', 'StartUp ABC'],
      sentDate: '02/01/2025',
      sentBy: 'Maria Santos',
      type: 'manual',
      status: 'Enviado'
    },
    {
      id: 3,
      title: 'Confirmação Automática: Documentos Recebidos',
      message: 'Documentos recebidos com sucesso! Eles estão sendo processados.',
      recipients: ['João Silva'],
      sentDate: '02/01/2025',
      sentBy: 'Sistema Automático',
      type: 'auto',
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

  const toggleAutomatedReminder = (id: number) => {
    setAutomatedReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
    
    const reminder = automatedReminders.find(r => r.id === id);
    toast({
      title: reminder?.active ? "Lembrete desativado" : "Lembrete ativado",
      description: `O lembrete "${reminder?.name}" foi ${reminder?.active ? 'desativado' : 'ativado'}.`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'auto':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'manual':
        return <Bell className="w-4 h-4 text-gray-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const stats = {
    total: notifications.length,
    automaticas: notifications.filter(n => n.type === 'auto').length,
    manuais: notifications.filter(n => n.type === 'manual').length,
    ativas: automatedReminders.filter(r => r.active).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Centro de Notificações</h1>
        <p className="text-gray-600">Gerencie notificações manuais e lembretes automáticos</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enviadas</p>
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
                <p className="text-sm font-medium text-gray-600">Automáticas</p>
                <p className="text-2xl font-bold text-blue-600">{stats.automaticas}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Manuais</p>
                <p className="text-2xl font-bold text-green-600">{stats.manuais}</p>
              </div>
              <Send className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="erentav-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lembretes Ativos</p>
                <p className="text-2xl font-bold text-purple-600">{stats.ativas}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nova Notificação Manual */}
        <Card className="erentav-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-erentav-primary" />
              Nova Notificação Manual
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

        {/* Lembretes Automáticos */}
        <Card className="erentav-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-erentav-primary" />
              Lembretes Automáticos
            </CardTitle>
            <CardDescription>
              Configure lembretes automáticos para envio de documentação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {automatedReminders.map((reminder) => (
              <div key={reminder.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{reminder.name}</h4>
                  <Switch
                    checked={reminder.active}
                    onCheckedChange={() => toggleAutomatedReminder(reminder.id)}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {reminder.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Frequência: {reminder.frequency}</span>
                  <Badge variant={reminder.active ? "default" : "secondary"}>
                    {reminder.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Notificações */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle>Histórico de Notificações</CardTitle>
          <CardDescription>
            Todas as notificações enviadas (manuais e automáticas)
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
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <Badge variant={notification.type === 'auto' ? 'default' : 'outline'}>
                          {notification.type === 'auto' ? 'Automática' : 'Manual'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                  
                  <Badge variant="default">{notification.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
