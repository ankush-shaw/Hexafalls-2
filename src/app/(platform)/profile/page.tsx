'use client';

import React from 'react';
import { PageLayout } from '../../../layouts/PageLayout';
import { Card, Skeleton } from '../../../components/ui/design-system';

export default function ProfilePage() {
  return (
    <PageLayout
      title="User Profile"
      description="View and manage credentials and platform access logs."
    >
      <Card className="max-w-md p-6 space-y-4 mx-auto">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3.5 w-48" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </Card>
    </PageLayout>
  );
}
