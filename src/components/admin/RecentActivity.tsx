
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { useRecentActivity } from '@/hooks/useDashboardData';

export const RecentActivity = () => {
  const { data: activities, isLoading } = useRecentActivity();

  if (isLoading) {
    return (
      <Card className="erentav-card animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
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
          <Activity className="w-5 h-5 mr-2 text-erentav-primary" />
          Atividades Recentes
        </CardTitle>
        <CardDescription>
          Últimas ações realizadas no sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities?.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Nenhuma atividade recente encontrada
          </p>
        ) : (
          activities?.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-erentav-primary rounded-full"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user} - {activity.action}
                </p>
                {activity.description && (
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                )}
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
