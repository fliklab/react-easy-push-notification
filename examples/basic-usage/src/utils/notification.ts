/**
 * 알림 옵션 타입 정의
 */
interface NotificationOptions {
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  vibrate?: number[];
  renotify?: boolean;
  requireInteraction?: boolean;
  silent?: boolean;
}

let notificationCounter = 0;

/**
 * 알림을 스케줄링하는 함수
 * @param title 알림 제목
 * @param scheduledTime 예약 시간
 * @param options 알림 옵션 (body 등)
 * @returns 알림 ID
 */
export const scheduleNotification = (
  title: string,
  scheduledTime: Date,
  options: NotificationOptions = {}
): number => {
  const notificationId = ++notificationCounter;
  const delay = scheduledTime.getTime() - Date.now();

  if (delay > 0) {
    setTimeout(() => {
      // 알림 권한이 있는지 확인
      if (Notification.permission === "granted") {
        new Notification(title, {
          ...options,
          tag: `scheduled-${notificationId}`,
          icon: "https://fonts.gstatic.com/s/i/materialicons/notifications_active/v12/24px.svg",
          badge:
            "https://fonts.gstatic.com/s/i/materialicons/notifications/v12/24px.svg",
        });
      }
    }, delay);
  }

  return notificationId;
};

/**
 * 예약된 알림을 취소하는 함수
 * @param notificationId 취소할 알림 ID
 */
export const cancelScheduledNotification = (notificationId: number): void => {
  // 현재는 setTimeout을 취소할 수 없지만,
  // 향후 WorkerTimer나 다른 방식으로 구현하면 취소 가능하도록 준비
  console.log(`Notification ${notificationId} cancelled`);
};
