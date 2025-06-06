export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.ts', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.error("This browser does not support notifications");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await registerServiceWorker();
    }
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

export const sendNotification = (
  title: string,
  options?: NotificationOptions
): void => {
  if (!("Notification" in window)) {
    console.error("This browser does not support notifications");
    return;
  }

  if (Notification.permission === "granted") {
    try {
      new Notification(title, options);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
};

export const scheduleNotification = (
  title: string,
  scheduledTime: Date,
  options?: NotificationOptions
): number => {
  const now = new Date().getTime();
  const scheduleTime = scheduledTime.getTime();
  const delay = Math.max(0, scheduleTime - now);

  return window.setTimeout(() => {
    sendNotification(title, options);
  }, delay);
};

export const cancelScheduledNotification = (timeoutId: number): void => {
  window.clearTimeout(timeoutId);
};
