'use client';
import React, { useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { PageHeader } from '../../../components/shared/PageHeader';
import { PageContainer } from '../../../components/shared/PageContainer';
import { EmptyState } from '../../../components/shared/EmptyState';
import { useUIStore } from '../../../store/uiStore';

export default function AnalyticsPage() {
  const { setBreadcrumbs } = useUIStore();
  useEffect(() => { setBreadcrumbs([{ label: 'Analytics' }]); }, [setBreadcrumbs]);

  return (
    <PageContainer>
      <PageHeader
        title="Analytics"
        description="Real-time metrics, charts, and performance insights for your AI platform."
        breadcrumbs={[{ label: 'Analytics' }]}
      />
      <EmptyState
        icon={BarChart3}
        title="No analytics data"
        description="Analytics charts will appear once your workflows have generated data. Coming in Phase 4."
      />
    </PageContainer>
  );
}
