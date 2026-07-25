'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useNotificationsStore, AppNotification } from '../../store/notificationsStore';
import { cn } from '../../utils/cn';

export function ToastContainer() {
  const { notifications, removeNotification } = useNotificationsStore();
  
  // Show up to top 5 recent notifications as toasts
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {recentNotifications.map((notif) => (
          <ToastItem 
            key={notif.id} 
            notification={notif} 
            onClose={() => removeNotification(notif.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  notification: AppNotification;
  onClose: () => void;
}

function ToastItem({ notification, onClose }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    info: <Info className="h-5 w-5 text-sky-400 shrink-0" />,
    success: <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
    error: <XCircle className="h-5 w-5 text-rose-400 shrink-0" />,
  };

  const borders = {
    info: 'border-sky-500/20 bg-sky-950/30',
    success: 'border-emerald-500/20 bg-emerald-950/30',
    warning: 'border-amber-500/20 bg-amber-950/30',
    error: 'border-rose-500/20 bg-rose-950/30',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={cn(
        "flex gap-3 p-4 rounded-xl border glass-panel shadow-lg items-start relative overflow-hidden",
        borders[notification.type]
      )}
    >
      {/* Icon */}
      {icons[notification.type]}

      {/* Content */}
      <div className="flex-1 space-y-0.5 text-left pr-4">
        <h4 className="font-bold text-xs tracking-tight">{notification.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{notification.message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="p-0.5 text-muted-foreground hover:text-foreground rounded transition-colors ml-auto shrink-0 cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Shimmer line progress tracker */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        className={cn(
          "absolute bottom-0 left-0 h-0.5",
          notification.type === 'info' && 'bg-sky-500',
          notification.type === 'success' && 'bg-emerald-500',
          notification.type === 'warning' && 'bg-amber-500',
          notification.type === 'error' && 'bg-rose-500'
        )}
      />
    </motion.div>
  );
}

export default ToastContainer;
