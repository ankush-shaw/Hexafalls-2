'use client';

import React, { useEffect } from 'react';
import { SupervisorHeader } from './SupervisorHeader';
import { SupervisorCard } from './SupervisorCard';
import { WorkflowBreakdown } from './WorkflowBreakdown';
import { ExecutionQueue } from './ExecutionQueue';
import { WorkerAssignment } from './WorkerAssignment';
import { DependencyView } from './DependencyView';
import { ExecutionTimeline } from './ExecutionTimeline';
import { RetryCard } from './RetryCard';
import { CommunicationFeed } from './CommunicationFeed';
import { PerformanceCard, MetricsCard } from './PerformanceCard';
import { SupervisorEmptyState } from './SupervisorEmptyState';
import { useSupervisorStore } from '../../store/supervisorStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function SupervisorWorkspace() {
  const { currentSession, isOrchestratingActive, tickTimer, retryTask } = useSupervisorStore();
  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Supervisor AI', href: '/workflow' }, { label: 'Operations Center' }]);
  }, [setBreadcrumbs]);

  // Master timer tick for elapsed seconds simulation
  useEffect(() => {
    if (!isOrchestratingActive) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isOrchestratingActive, tickTimer]);

  return (
    <PageContainer className="space-y-6 max-w-[1700px] mx-auto">
      {/* Top Operations Header */}
      <SupervisorHeader />

      {!currentSession ? (
        <SupervisorEmptyState />
      ) : (
        /* 3-Column Master Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel (3 Cols): Metrics Breakdown & Task Prerequisites */}
          <div className="lg:col-span-3 space-y-4">
            <MetricsCard metrics={currentSession.metrics} />
            <DependencyView tasks={currentSession.tasks} />
            <RetryCard tasks={currentSession.tasks} onRetryTask={retryTask} />
          </div>

          {/* Center Panel (6 Cols): Supervisor Hero Card, Workflow Breakdown, Execution Queue, Worker Pool, Activity Log */}
          <div className="lg:col-span-6 space-y-6">
            <SupervisorCard />
            <WorkflowBreakdown tasks={currentSession.tasks} />
            <ExecutionQueue tasks={currentSession.tasks} onRetryTask={retryTask} />
            <WorkerAssignment workers={currentSession.workers} />
            <ExecutionTimeline activities={currentSession.activities} />
          </div>

          {/* Right Panel (3 Cols): Performance Metrics, Worker Communication Stream */}
          <div className="lg:col-span-3 space-y-4">
            <PerformanceCard metrics={currentSession.metrics} />
            <CommunicationFeed communications={currentSession.communications} />
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default SupervisorWorkspace;
