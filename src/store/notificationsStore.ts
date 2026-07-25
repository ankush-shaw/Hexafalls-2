import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface NotificationsState {
  notifications: AppNotification[];
  unreadCount: number;
}

interface NotificationsActions {
  addNotification: (notification: Omit<AppNotification, 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

type NotificationsStore = NotificationsState & NotificationsActions;

export const useNotificationsStore = create<NotificationsStore>()(
  devtools(
    (set) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) =>
        set((state) => {
          const newNotification: AppNotification = { ...notification, read: false };
          const nextNotifications = [newNotification, ...state.notifications];
          return {
            notifications: nextNotifications,
            unreadCount: nextNotifications.filter((n) => !n.read).length,
          };
        }),
      markAsRead: (id) =>
        set((state) => {
          const nextNotifications = state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          );
          return {
            notifications: nextNotifications,
            unreadCount: nextNotifications.filter((n) => !n.read).length,
          };
        }),
      markAllAsRead: () =>
        set((state) => {
          const nextNotifications = state.notifications.map((n) => ({ ...n, read: true }));
          return {
            notifications: nextNotifications,
            unreadCount: 0,
          };
        }),
      removeNotification: (id) =>
        set((state) => {
          const nextNotifications = state.notifications.filter((n) => n.id !== id);
          return {
            notifications: nextNotifications,
            unreadCount: nextNotifications.filter((n) => !n.read).length,
          };
        }),
      clearAll: () =>
        set({
          notifications: [],
          unreadCount: 0,
        }),
    }),
    { name: 'NotificationsStore' }
  )
);
