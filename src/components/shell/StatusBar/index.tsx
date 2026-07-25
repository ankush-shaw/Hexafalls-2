'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useUserStore } from '../../../store/userStore';
import { useSocket } from '../../../providers/SocketProvider';
import { StatusDot } from '../../shared/StatusDot';
import { cn } from '../../../utils/cn';

const APP_VERSION = '1.0.0-beta';
const ENVIRONMENT = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

export function StatusBar({ className }: { className?: string }) {
  const { user } = useUserStore();
  const { isConnected, connectionState } = useSocket();
  const [now, setNow] = useState('');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(format(new Date(), 'HH:mm:ss'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fake latency ping simulation (real ping hooks up in Phase 3)
  useEffect(() => {
    if (!isConnected) return;
    // initial reading deferred via timeout so it's not synchronous in the effect body
    const init = setTimeout(() => setLatency(12), 0);
    const id = setInterval(() => setLatency(Math.floor(Math.random() * 30) + 8), 5000);
    return () => { setLatency(null); clearTimeout(init); clearInterval(id); };
  }, [isConnected]);

  const socketColor = connectionState === 'connected' ? 'green' : connectionState === 'connecting' ? 'amber' : 'red';

  return (
    <footer className={cn(
      'h-7 flex items-center justify-between px-4 border-t border-border/50 bg-card/80 backdrop-blur-sm text-[10px] text-muted-foreground font-mono shrink-0 z-10',
      className
    )}>
      {/* Left */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <StatusDot color={socketColor} pulse={connectionState === 'connected'} />
          Socket {connectionState}
        </span>
        <span className="hidden sm:flex items-center gap-1.5">
          <StatusDot color="green" pulse />
          API online
        </span>
        {latency !== null && (
          <span className="hidden md:block text-muted-foreground/60">
            {latency}ms
          </span>
        )}
      </div>

      {/* Center */}
      <div className="hidden sm:flex items-center gap-3">
        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
          {ENVIRONMENT}
        </span>
        <span className="text-muted-foreground/60">v{APP_VERSION}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="hidden md:block truncate max-w-32">{user.email}</span>
        )}
        <span>{now}</span>
      </div>
    </footer>
  );
}
export default StatusBar;
