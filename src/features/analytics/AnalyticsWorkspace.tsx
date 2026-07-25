'use client';

import React, { useEffect } from 'react';
import { AnalyticsOverview } from './AnalyticsOverview';
import { AgentAnalytics } from './AgentAnalytics';
import { SystemMonitor } from './SystemMonitor';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function AnalyticsWorkspace() {
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Analytics', href: '/analytics' }, { label: 'Platform Telemetry' }]);
  }, [setBreadcrumbs]);

  return (
    <PageContainer className="space-y-6 max-w-[1700px] mx-auto">
      {/* Top Overview KPI Cards */}
      <AnalyticsOverview />

      {/* Agent Tier Performance Breakdown */}
      <AgentAnalytics />

      {/* System Hardware & Latency Telemetry */}
      <SystemMonitor />
    </PageContainer>
  );
}

export default AnalyticsWorkspace;
