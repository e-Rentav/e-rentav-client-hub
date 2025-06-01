
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';

export const RecentActivity = () => {
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

  return (
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
  );
};
