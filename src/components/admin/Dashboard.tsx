import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export const Dashboard = () => {
  const kpis = [{
    title: "Total de Clientes",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "Em relação ao mês passado"
  }, {
    title: "Documentos Recebidos",
    value: "1,432",
    change: "+8%",
    changeType: "positive" as const,
    icon: FileText,
    description: "Este mês"
  }, {
    title: "Pendências",
    value: "23",
    change: "-15%",
    changeType: "positive" as const,
    icon: AlertTriangle,
    description: "Documentos em análise"
  }, {
    title: "Receita Mensal",
    value: "R$ 45.2k",
    change: "+23%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "Contratos ativos"
  }];

  const recentClients = [{
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    plan: "Anual",
    status: "Ativo",
    lastUpload: "2 dias atrás"
  }, {
    name: "Inovação Digital",
    email: "admin@inovacaodigital.com",
    plan: "Mensal",
    status: "Pendente",
    lastUpload: "5 dias atrás"
  }, {
    name: "StartUp ABC",
    email: "hello@startupabc.com",
    plan: "Trimestral",
    status: "Ativo",
    lastUpload: "1 dia atrás"
  }];

  const planDistribution = [{
    name: "Mensal",
    count: 142,
    percentage: 57
  }, {
    name: "Trimestral",
    count: 68,
    percentage: 27
  }, {
    name: "Anual",
    count: 38,
    percentage: 16
  }];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema e métricas principais</p>
      </div>

      {/* Ações Rápidas - movido para cima */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-erentav-primary" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>
            Tarefas pendentes que precisam da sua atenção
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-orange-200 rounded-lg bg-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Clientes a fazer</p>
                  <p className="text-2xl font-bold text-white">23</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="p-4 border border-blue-200 rounded-lg bg-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Clientes sem upload</p>
                  <p className="text-2xl font-bold text-white">47</p>
                </div>
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Processados Hoje</p>
                  <p className="text-2xl font-bold text-green-900">89</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Grid - movido para baixo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="erentav-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-erentav-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className={`mr-1 ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </span>
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Distribuição de Planos */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-erentav-primary" />
            Distribuição de Planos
          </CardTitle>
          <CardDescription>
            Como seus clientes estão distribuídos por tipo de plano
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {planDistribution.map((plan, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{plan.name}</span>
                <span className="text-sm text-gray-600">{plan.count} clientes</span>
              </div>
              <Progress value={plan.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clientes Recentes */}
      <Card className="erentav-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-erentav-primary" />
            Atividade Recente
          </CardTitle>
          <CardDescription>
            Últimos clientes com atividade no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{client.name}</p>
                  <p className="text-xs text-gray-600">{client.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {client.lastUpload}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={client.status === 'Ativo' ? 'default' : 'secondary'} className="text-xs">
                    {client.status}
                  </Badge>
                  <p className="text-xs text-gray-600">{client.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
