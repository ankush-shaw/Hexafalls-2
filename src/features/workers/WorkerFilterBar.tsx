'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useWorkerStore } from '../../store/workerStore';
import { WorkerDepartment, WorkerState } from '../../types/worker.types';
import { cn } from '../../utils/cn';

const departments: (WorkerDepartment | 'All')[] = [
  'All',
  'Data Science',
  'Finance',
  'Legal',
  'Operations',
  'Marketing',
  'Technical',
  'Sales',
  'Support',
];

const statusFilters: (WorkerState | 'All')[] = [
  'All',
  'running',
  'waiting',
  'completed',
  'retrying',
  'paused',
];

export function WorkerFilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
  } = useWorkerStore();

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search worker by name, task, or department..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-border/50 bg-card/80 text-xs font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Department Dropdown */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0 flex items-center gap-1">
          <Filter className="h-3 w-3" /> Dept:
        </span>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value as WorkerDepartment | 'All')}
          className="px-3 py-1.5 rounded-xl border border-border/50 bg-card/80 text-xs font-semibold text-foreground focus:outline-none focus:border-primary/50 cursor-pointer"
        >

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/40 shrink-0">
          {statusFilters.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer',
                statusFilter === st
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkerFilterBar;
