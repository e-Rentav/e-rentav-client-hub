
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, AlertTriangle, DollarSign } from 'lucide-react';

export const KPIGrid = () => {
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

  return (
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
  );
};
