'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card, Skeleton } from '../../../components/ui/design-system';

export default function AnalyticsPage() {
  return (
    <PageLayout
      title="System Metrics & Analytics"
      description="Orchestrator resource usage, cost analytics, and response rate metrics."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-80 space-y-4">
          <div className="border-b border-border/30 pb-3">
            <h4 className="font-bold text-sm">LLM API Token Usage Cost</h4>
          </div>
          <div className="flex-1 flex items-center justify-center h-48 bg-background/30 rounded-lg border border-border/25">
            <Skeleton className="h-5/6 w-11/12" />
          </div>
        </Card>

        <Card className="h-80 space-y-4">
          <div className="border-b border-border/30 pb-3">
            <h4 className="font-bold text-sm">System Load (CPU & RAM)</h4>
          </div>
          <div className="flex-1 flex items-center justify-center h-48 bg-background/30 rounded-lg border border-border/25">
            <Skeleton className="h-5/6 w-11/12" />
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
