'use client';
import React from 'react';
import { useSocket } from '../../../providers/SocketProvider';
import { StatusDot } from '../../shared/StatusDot';
import { cn } from '../../../utils/cn';

export function ConnectionStatus() {
  const { isConnected, connectionState } = useSocket();
  const color = connectionState === 'connected' ? 'green' : connectionState === 'connecting' ? 'amber' : 'red';

  return (
    <div
      className={cn(
        'hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-colors',
        isConnected
          ? 'border-emerald-500/20 bg-emerald-500/8 text-emerald-400'
          : 'border-rose-500/20 bg-rose-500/8 text-rose-400'
      )}
      title={`Socket ${connectionState}`}
    >
      <StatusDot color={color} pulse={isConnected} />
      <span className="uppercase tracking-widest">{isConnected ? 'Live' : connectionState}</span>
    </div>
  );
}
export default ConnectionStatus;
