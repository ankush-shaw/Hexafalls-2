'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Info, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import { useNotificationsStore } from '../../../store/notificationsStore';
import { cn } from '../../../utils/cn';
import { formatRelative } from '../../../utils/date.utils';

const typeIcon = {
  info:    { icon: Info,         color: 'text-sky-400 bg-sky-500/10' },
  success: { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10' },
  warning: { icon: AlertTriangle,color: 'text-amber-400 bg-amber-500/10' },
  error:   { icon: AlertTriangle,color: 'text-rose-400 bg-rose-500/10' },
};

export function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead, markAsRead, removeNotification } = useNotificationsStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Notifications"
        className="relative h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <motion.span
            key={unreadCount}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-0.5 -right-0.5 h-4 min-w-4 flex items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground px-0.5"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="notif-panel"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-80 rounded-xl border border-border bg-popover shadow-2xl shadow-black/30 overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="h-5 min-w-5 flex items-center justify-center px-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors cursor-pointer"
                  >
                    <Check className="h-3 w-3" /> All read
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground/30" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">All caught up!</p>
                </div>
              ) : (
                notifications.slice(0, 15).map((n) => {
                  const cfg = typeIcon[n.type] ?? typeIcon.info;
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        'flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors group border-b border-border/30 last:border-0',
                        !n.read && 'bg-primary/[0.03]'
                      )}
                    >
                      <div className={cn('p-1.5 rounded-lg h-fit mt-0.5 shrink-0', cfg.color)}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div
                        className="flex-1 min-w-0 space-y-1 cursor-pointer"
                        onClick={() => markAsRead(n.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && markAsRead(n.id)}
                      >
                        <p className={cn('text-xs leading-snug', !n.read ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                          {n.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{formatRelative(n.timestamp)}</p>
                      </div>
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="shrink-0 p-1 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-all cursor-pointer"
                        aria-label="Delete notification"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default NotificationBell;
