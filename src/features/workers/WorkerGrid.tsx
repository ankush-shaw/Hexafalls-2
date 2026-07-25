'use client';

import React from 'react';
import { WorkerCard } from './WorkerCard';

import { WorkerAgent } from '../../types/worker.types';
import { cn } from '../../utils/cn';

interface WorkerGridProps {
  workers: WorkerAgent[];
  className?: string;
}

export function WorkerGrid({ workers, className }: WorkerGridProps) {
  if (workers.length === 0) {
    return (
      <div className="p-8 rounded-3xl border border-dashed border-border/60 text-center space-y-2">
        <p className="text-xs font-bold text-muted-foreground">No worker agents matched your search filter criteria.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
}

export default WorkerGrid;
