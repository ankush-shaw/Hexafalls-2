'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card, Skeleton } from '../../../components/ui/design-system';

export default function NotificationsPage() {
  return (
    <PageLayout
      title="System Notifications"
      description="System alerts, errors, and task notifications."
    >
      <Card className="p-6 space-y-4">
        <div className="border-b border-border/30 pb-3">
          <h4 className="font-bold text-sm">Notifications Panel</h4>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </Card>
    </PageLayout>
  );
}
