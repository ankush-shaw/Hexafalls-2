'use client';

import React, { useEffect } from 'react';
import { WorkerHeader } from './WorkerHeader';
import { WorkerFilterBar } from './WorkerFilterBar';
import { WorkerGrid } from './WorkerGrid';
import { WorkerDetails } from './WorkerDetails';
import { CommunicationFeed } from './CommunicationFeed';
import { WorkerEmptyState } from './WorkerEmptyState';
import { useWorkerStore } from '../../store/workerStore';
import { PageContainer } from '../../components/shared/PageContainer';
import { useUIStore } from '../../store/uiStore';

export function WorkerWorkspace() {
  const {
    workers,
    searchQuery,
    departmentFilter,
    statusFilter,
    isSimulationActive,
    tickTimer,
  } = useWorkerStore();

  const { setBreadcrumbs } = useUIStore();

  useEffect(() => {
    setBreadcrumbs([{ label: 'Worker Agents', href: '/agents' }, { label: 'Dynamic Ecosystem' }]);
  }, [setBreadcrumbs]);

  // Timer tick for active worker progress simulation
  useEffect(() => {
    if (!isSimulationActive) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulationActive, tickTimer]);

  // Filter workers based on search, department, and status
  const filteredWorkers = workers.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.assignedTaskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = departmentFilter === 'All' || w.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <PageContainer className="space-y-6 max-w-[1700px] mx-auto">
      {/* Header */}
      <WorkerHeader />

      {workers.length === 0 ? (
        <WorkerEmptyState />
      ) : (
        <div className="space-y-6">
          {/* Search & Filters */}
          <WorkerFilterBar />

          {/* Master 2-Column Section: Grid on Left/Center, Communication Feed on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              <WorkerGrid workers={filteredWorkers} />
            </div>

            <div className="lg:col-span-4 space-y-4">
              <CommunicationFeed />
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Inspector Drawer for Selected Worker */}
      <WorkerDetails />
    </PageContainer>
  );
}

export default WorkerWorkspace;
