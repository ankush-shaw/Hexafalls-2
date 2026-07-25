'use client';

import { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export function useNetworkStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return navigator.onLine;
  });
  const setOnlineStore = useSettingsStore((state) => state.setOnlineStatus);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOnlineStore(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOnlineStore(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStore]);

  return isOnline;
}

export default useNetworkStatus;

