import {
  INotification,
  INotificationsResponse,
} from '@/types/notification.type';
import NotificationHeader from './_components/notification-header';
import NotificationContainer from './_components/notification-container';
import { get } from '@/utils/methods';
import { AlertCircle, Inbox } from 'lucide-react';
import { cookies } from 'next/headers';

const NotificationsPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;
  let notifications: INotification[] | null = [];
  let error = null;

  try {
    const res = await get<INotificationsResponse>('/api/notifications', {
      isAuthenticated: true,
      token: accessToken!,
    });
    notifications = res.notifications || [];
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="bg-background animate-fade-in min-h-screen p-6 md:p-10">
        <div className="mx-auto max-w-4xl space-y-8">
          <NotificationHeader />

          <div className="space-y-4">
            <div className="border-border animate-scale-in flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
              <div className="bg-destructive/50 flex h-16 w-16 items-center justify-center rounded-full">
                <AlertCircle className="text-destructive-foreground h-8 w-8" />
              </div>
              <h3 className="text-foreground mt-4 text-lg font-semibold">
                Error loading notifications
              </h3>
              <p className="text-muted-foreground">Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="border-border animate-scale-in flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
        <div className="bg-muted/50 flex h-16 w-16 items-center justify-center rounded-full">
          <Inbox className="text-muted-foreground h-8 w-8" />
        </div>
        <h3 className="text-foreground mt-4 text-lg font-semibold">
          No notifications
        </h3>
        <p className="text-muted-foreground">
          You&apos;re all caught up! Check back later for new updates.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background animate-fade-in min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <NotificationHeader />
        <div className="space-y-4">
          <NotificationContainer notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
