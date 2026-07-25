'use client';

import React, { useEffect } from 'react';
import { ErrorLayout } from '../layouts/ErrorLayout';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring services (Phase 2)
    console.error('Captured runtime global error boundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <ErrorLayout
        statusCode={500}
        title="Operational Exception Captured"
        message={error.message || "An unexpected subsystem exception interrupted our multi-agent platform session pipeline."}
        onReset={reset}
      />
    </div>
  );
}
