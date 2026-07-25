'use client';

import React from 'react';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { QueryProvider } from '../../providers/QueryProvider';
import { SocketProvider } from '../../providers/SocketProvider';
import { AuthProvider } from '../../providers/AuthProvider';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider>
          <SocketProvider>
            {children}
          </SocketProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
