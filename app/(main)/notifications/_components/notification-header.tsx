'use client';
import { useNotificationStore } from '@/store/notification.store';
import { CheckCheck } from 'lucide-react';

const NotificationHeader = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Notifications
        </h1>
        <p className="text-muted-foreground mt-1">
          You have {unreadCount} unread message{unreadCount !== 1 && 's'}
        </p>
      </div>
      {notifications.length > 0 && (
        <button
          onClick={markAllAsRead}
          className="group border-border bg-card hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-95"
        >
          <CheckCheck className="h-4 w-4" />
          <span>Mark all as read</span>
        </button>
      )}
    </div>
  );
};

export default NotificationHeader;
