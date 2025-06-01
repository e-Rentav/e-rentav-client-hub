
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ['dashboard-kpis'],
    queryFn: async () => {
      // Fetch total clients
      const { count: totalClients } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      // Fetch active clients
      const { count: activeClients } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ativo');

      // Fetch pending documents
      const { count: pendingDocuments } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pendente');

      // Calculate revenue (from active contracts)
      const { data: contracts } = await supabase
        .from('contracts')
        .select('monthly_value')
        .eq('status', 'ativo');

      const monthlyRevenue = contracts?.reduce((sum, contract) => sum + (contract.monthly_value || 0), 0) || 0;

      return {
        totalClients: totalClients || 0,
        activeClients: activeClients || 0,
        pendingDocuments: pendingDocuments || 0,
        monthlyRevenue
      };
    }
  });
};

export const usePlanDistribution = () => {
  return useQuery({
    queryKey: ['plan-distribution'],
    queryFn: async () => {
      const { data: contracts } = await supabase
        .from('contracts')
        .select('plan_type')
        .eq('status', 'ativo');

      const distribution = contracts?.reduce((acc, contract) => {
        const planType = contract.plan_type;
        acc[planType] = (acc[planType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);

      return [
        {
          name: "Mensal",
          count: distribution.mensal || 0,
          percentage: total > 0 ? Math.round(((distribution.mensal || 0) / total) * 100) : 0
        },
        {
          name: "Trimestral", 
          count: distribution.trimestral || 0,
          percentage: total > 0 ? Math.round(((distribution.trimestral || 0) / total) * 100) : 0
        },
        {
          name: "Anual",
          count: distribution.anual || 0,
          percentage: total > 0 ? Math.round(((distribution.anual || 0) / total) * 100) : 0
        }
      ];
    }
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      // Fetch activities with user information
      const { data: activities } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!activities) return [];

      // For each activity, fetch the user profile if user_id exists
      const activitiesWithUsers = await Promise.all(
        activities.map(async (activity) => {
          let userName = 'Sistema';
          
          if (activity.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('name')
              .eq('id', activity.user_id)
              .single();
            
            if (profile?.name) {
              userName = profile.name;
            }
          }

          return {
            id: activity.id,
            user: userName,
            action: activity.action,
            description: activity.description || '',
            time: new Date(activity.created_at).toLocaleString('pt-BR')
          };
        })
      );

      return activitiesWithUsers;
    }
  });
};
