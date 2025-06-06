import { useState, useCallback, useEffect } from "react";
import { requestNotificationPermission } from "../utils/notification";

interface UsePushNotificationReturn {
  isSubscribed: boolean;
  error: string | null;
  subscribe: () => Promise<void>;
  unsubscribe: () => void;
}

export const usePushNotification = (): UsePushNotificationReturn => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 초기 구독 상태 확인
    setIsSubscribed(Notification.permission === "granted");
  }, []);

  const subscribe = useCallback(async () => {
    try {
      setError(null);
      const granted = await requestNotificationPermission();
      setIsSubscribed(granted);
      if (!granted) {
        setError("알림 권한이 거부되었습니다.");
      }
    } catch (err) {
      setError("알림 구독 중 오류가 발생했습니다.");
      console.error("Subscription error:", err);
    }
  }, []);

  const unsubscribe = useCallback(() => {
    // 현재 Web Notification API는 권한을 취소하는 방법을 제공하지 않습니다.
    // 대신 브라우저 설정에서 수동으로 변경해야 합니다.
    // 이 함수는 훅의 내부 상태를 업데이트하여 UI에 반영합니다.
    setIsSubscribed(false);
    setError(null);
  }, []);

  return {
    isSubscribed,
    error,
    subscribe,
    unsubscribe,
  };
};
