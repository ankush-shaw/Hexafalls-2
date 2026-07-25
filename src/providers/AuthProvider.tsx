'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '../store/userStore';
import { ROUTES } from '../constants/routes';

interface AuthContextValue {
  isLoading: boolean;
  isAuthenticated: boolean;
  loginBypass: (username: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const PUBLIC_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, setUser, logout, setLoading } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Quick session check simulation on startup
    const checkSession = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('aegisos-token');
        if (storedToken && !user) {
          // Mock fetch user session
          setUser({
            id: 'usr-1',
            email: 'admin@aegisos.ai',
            name: 'Hackathon Admin',
            role: 'admin',
            createdAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error('Session validation error:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [user, setUser, logout, setLoading]);

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect unauthenticated user to login (Bypassed for hackathon simplicity if needed, but structured for production)
      router.push(ROUTES.AUTH.LOGIN);
    } else if (isAuthenticated && isPublicRoute) {
      // Redirect authenticated user away from auth pages
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, pathname, isLoading, router]);

  const loginBypass = (username: string) => {
    setLoading(true);
    localStorage.setItem('aegisos-token', 'hackathon-bypass-jwt-token');
    localStorage.setItem('aegisos-refresh-token', 'hackathon-bypass-refresh-token');
    setUser({
      id: 'usr-1',
      email: `${username.toLowerCase()}@aegisos.ai`,
      name: username,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    setLoading(false);
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, loginBypass }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export default AuthProvider;
