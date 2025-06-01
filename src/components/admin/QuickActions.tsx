
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

export const QuickActions = () => {
  return (
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
          
          <div className="p-4 border border-orange-200 rounded-lg bg-orange-600">
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
  );
};
