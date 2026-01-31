import { deleteNotification } from '@/actions/notification';
import { cn } from '@/lib/utils';
import { useNotificationStore } from '@/store/notification.store';
import { INotification } from '@/types/notification.type';
import { logError } from '@/utils/apiError';
import { Bell, Check, Clock, Trash2 } from 'lucide-react';
import { useTransition } from 'react';

const Notification = ({ notification }: { notification: INotification }) => {
  const { markAsRead, removeNotification } = useNotificationStore();
  const [isDeletetingNotification, startTransition] = useTransition();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  const handleDeleteNotification = async () => {
    removeNotification(notification._id);
    startTransition(async () => {
      try {
        await deleteNotification(notification._id);
      } catch (error) {
        logError(error, 'NotificationDelete');
      }
    });
  };
  return (
    <li
      key={notification._id}
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl border p-5 transition-all duration-200 sm:flex-row sm:items-start sm:justify-between',
        notification.isRead
          ? 'bg-muted/5 hover:bg-muted/10 hover:border-border/50 border-transparent'
          : 'bg-card border-border hover:border-primary/20 shadow-sm hover:shadow-md',
      )}
    >
      {!notification.isRead && (
        <span className="bg-primary absolute top-6 -left-1 h-2 w-2 rounded-full shadow-[0_0_8px_hsl(var(--color-primary))]" />
      )}

      <div className="flex gap-4">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            notification.isRead
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary/10 text-primary',
          )}
        >
          <Bell className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p
            className={cn(
              'text-base leading-snug',
              notification.isRead
                ? 'text-muted-foreground'
                : 'text-foreground font-medium',
            )}
          >
            {notification.message}
          </p>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            {notification.senderId?.name && (
              <span className="text-foreground/80 font-medium">
                {notification.senderId.name}
              </span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(notification.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 self-end transition-opacity sm:self-center sm:opacity-0 sm:group-hover:opacity-100">
        {!notification.isRead && (
          <button
            onClick={() => markAsRead(notification._id)}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-colors"
            title="Mark as read"
          >
            <Check className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={handleDeleteNotification}
          className={cn(
            'text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg p-2 transition-colors',
            isDeletetingNotification && 'cursor-not-allowed opacity-50',
          )}
          title="Delete notification"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};

export default Notification;
