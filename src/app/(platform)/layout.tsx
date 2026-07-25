'use client';

import React from 'react';
import { PlatformShell } from '../../layouts/PlatformShell';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  return <PlatformShell>{children}</PlatformShell>;
}
