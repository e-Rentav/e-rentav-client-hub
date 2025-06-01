
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, FileText, DollarSign } from 'lucide-react';
import { useDashboardKPIs } from '@/hooks/useDashboardData';

export const KPIGrid = () => {
  const { data: kpis, isLoading } = useDashboardKPIs();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="erentav-card animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpiItems = [
    {
      title: "Total de Clientes",
      value: kpis?.totalClients || 0,
      description: "Clientes cadastrados",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Clientes Ativos", 
      value: kpis?.activeClients || 0,
      description: "Com contratos vigentes",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Documentos Pendentes",
      value: kpis?.pendingDocuments || 0,
      description: "Aguardando análise",
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Receita Mensal",
      value: `R$ ${(kpis?.monthlyRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      description: "Receita recorrente",
      icon: DollarSign,
      color: "text-green-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiItems.map((item, index) => (
        <Card key={index} className="erentav-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className={`w-4 h-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
