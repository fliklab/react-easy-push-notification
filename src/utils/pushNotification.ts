/**
 * 브라우저 알림 권한을 요청합니다.
 * @returns {Promise<boolean>} 권한이 허용되면 true, 그렇지 않으면 false를 반환합니다.
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (!("Notification" in window)) {
      console.error("이 브라우저는 알림을 지원하지 않습니다.");
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("알림 권한 요청 중 오류가 발생했습니다:", error);
    return false;
  }
};

/**
 * 푸시 알림을 표시합니다.
 * @param {string} title - 알림 제목
 * @param {NotificationOptions} options - 알림 옵션
 * @returns {Promise<void>}
 */
export const showNotification = async (
  title: string,
  options?: NotificationOptions
): Promise<void> => {
  try {
    if (Notification.permission !== "granted") {
      console.warn("알림 권한이 없습니다.");
      return;
    }

    const notification = new Notification(title, options);
    return new Promise((resolve) => {
      notification.onshow = () => resolve();
    });
  } catch (error) {
    console.error("알림 표시 중 오류가 발생했습니다:", error);
  }
};
