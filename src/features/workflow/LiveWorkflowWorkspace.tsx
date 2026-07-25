'use client';

import React, { useEffect } from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { AgentInspector } from './AgentInspector';
import { WorkflowReplay } from './WorkflowReplay';
import { SystemHealthCard } from './SystemHealthCard';
import { LiveEventFeed } from './LiveEventFeed';
import { WorkflowMetricsCard } from './WorkflowMetricsCard';
import { useWorkflowStore } from '../../store/workflowStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function LiveWorkflowWorkspace() {
  const { tickTimer } = useWorkflowStore();
  const { setBreadcrumbs } = useUIStore();


  useEffect(() => {
    setBreadcrumbs([{ label: 'Workflow Engine', href: '/workflow' }, { label: 'Real-Time Multi-Agent Canvas' }]);
  }, [setBreadcrumbs]);

  // Master timer tick for simulation
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  return (
    <PageContainer className="space-y-6 max-w-[1700px] mx-auto">
      {/* Workflow Replay Bar */}
      <WorkflowReplay />

      {/* Main 2-Column Section: React Flow Canvas on Left/Center, Health & Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center (8 Cols): React Flow Interactive Canvas */}
        <div className="lg:col-span-8 space-y-6">
          <WorkflowCanvas />
          <LiveEventFeed />
        </div>

        {/* Right (4 Cols): Live System Health & Workflow Metrics */}
        <div className="lg:col-span-4 space-y-4">
          <WorkflowMetricsCard />
          <SystemHealthCard />
        </div>
      </div>

      {/* Slide-Over Node Inspector Drawer */}
      <AgentInspector />
    </PageContainer>
  );
}

export default LiveWorkflowWorkspace;
