'use client';

import React from 'react';
import { ErrorLayout } from '../layouts/ErrorLayout';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <ErrorLayout
        statusCode={404}
        title="Command Node Lost"
        message="The page coordinates you entered do not exist on our navigation grid. Return back to dashboard operations."
      />
    </div>
  );
}
