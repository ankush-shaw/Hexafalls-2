'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/userStore';
import { ROUTES } from '../constants/routes';

/**
 * useLogout — clears the auth token from localStorage,
 * resets the Zustand user store, and navigates to /login.
 * Use this everywhere a sign-out button appears.
 */
export function useLogout() {
  const { logout } = useUserStore();
  const router = useRouter();

  return useCallback(() => {
    // Clear persisted auth tokens so AuthProvider doesn't restore the session
    localStorage.removeItem('aegisos-token');
    localStorage.removeItem('aegisos-refresh-token');
    // Clear Zustand state
    logout();
    // Navigate to login
    router.push(ROUTES.AUTH.LOGIN);
  }, [logout, router]);
}

export default useLogout;
