'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card, Skeleton } from '../../../components/ui/design-system';

export default function HistoryPage() {
  return (
    <PageLayout
      title="Workflow Execution History"
      description="Review chronological runs, execution outputs, and log snapshots."
    >
      <Card className="p-6 space-y-4">
        <div className="border-b border-border/30 pb-3">
          <h4 className="font-bold text-sm">Chronological Runs</h4>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-12 w-full animate-pulse" />
          <Skeleton className="h-12 w-full animate-pulse" />
          <Skeleton className="h-12 w-full animate-pulse" />
        </div>
      </Card>
    </PageLayout>
  );
}
