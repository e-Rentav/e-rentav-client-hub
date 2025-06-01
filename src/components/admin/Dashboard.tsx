
import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { QuickActions } from './QuickActions';
import { KPIGrid } from './KPIGrid';
import { PlanDistribution } from './PlanDistribution';
import { RecentActivity } from './RecentActivity';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <QuickActions />
      <KPIGrid />
      <PlanDistribution />
      <RecentActivity />
    </div>
  );
};
