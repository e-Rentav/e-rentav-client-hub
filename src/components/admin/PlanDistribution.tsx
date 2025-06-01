
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

export const PlanDistribution = () => {
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
  );
};
