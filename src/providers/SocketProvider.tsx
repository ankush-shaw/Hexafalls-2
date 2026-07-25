'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { socketClient } from '../services/socket/socket.client';

type SocketConnectionState = 'disconnected' | 'connecting' | 'connected';

interface SocketContextValue {
  connectionState: SocketConnectionState;
  isConnected: boolean;
  isConnecting: boolean;
  emit: typeof socketClient.emit;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [connectionState, setConnectionState] = useState<SocketConnectionState>('disconnected');

  useEffect(() => {
    // Connect socket on mount
    socketClient.connect();

    // Subscribe to state updates
    const unsubscribe = socketClient.subscribeToState((state) => {
      setConnectionState(state);
    });

    return () => {
      unsubscribe();
      socketClient.disconnect();
    };
  }, []);

  const value: SocketContextValue = {
    connectionState,
    isConnected: connectionState === 'connected',
    isConnecting: connectionState === 'connecting',
    emit: socketClient.emit.bind(socketClient),
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
export default SocketProvider;
