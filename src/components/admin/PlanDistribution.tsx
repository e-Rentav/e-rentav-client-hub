
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { usePlanDistribution } from '@/hooks/useDashboardData';

export const PlanDistribution = () => {
  const { data: planDistribution, isLoading } = usePlanDistribution();

  if (isLoading) {
    return (
      <Card className="erentav-card animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

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
        {planDistribution?.map((plan, index) => (
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
