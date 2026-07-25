'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card, Skeleton } from '../../../components/ui/design-system';

export default function SettingsPage() {
  return (
    <PageLayout
      title="Platform Settings"
      description="Configure LLMs, API endpoints, socket behaviors, and sound alerts."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 space-y-3 md:col-span-2">
          <div className="border-b border-border/30 pb-2">
            <h4 className="font-bold text-sm">LLM API Configuration</h4>
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </Card>

        <Card className="p-5 space-y-3">
          <div className="border-b border-border/30 pb-2">
            <h4 className="font-bold text-sm">Theme Settings</h4>
          </div>
          <Skeleton className="h-20 w-full" />
        </Card>
      </div>
    </PageLayout>
  );
}
