# @fliklab/react-push-notification

브라우저 웹 푸시 알림을 쉽게 구현할 수 있는 React 훅 라이브러리입니다.

## 특징

- 🚀 간단한 API로 빠른 구현
- 🎯 TypeScript 지원
- 📱 브라우저 알림 권한 관리
- ⚡ 커스텀 가능한 알림 디자인
- 🔄 Promise 기반 비동기 처리

## 설치 방법

```bash
# npm
npm install @fliklab/react-push-notification

# pnpm
pnpm add @fliklab/react-push-notification

# yarn
yarn add @fliklab/react-push-notification
```

## 기본 사용법

```tsx
import { usePushNotification } from "@fliklab/react-push-notification";

function App() {
  const {
    isSubscribed, // 알림 구독 상태
    error, // 에러 메시지
    subscribe, // 알림 구독 함수
    unsubscribe, // 알림 구독 해제 함수
  } = usePushNotification();

  const handleSubscribe = async () => {
    try {
      await subscribe();
      console.log("알림 구독 성공!");
    } catch (err) {
      console.error("알림 구독 실패:", err);
    }
  };

  return (
    <div>
      <h1>웹 푸시 알림 데모</h1>

      {/* 구독 상태 표시 */}
      <div>현재 상태: {isSubscribed ? "구독 중" : "미구독"}</div>

      {/* 에러 메시지 표시 */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* 구독 버튼 */}
      <button onClick={handleSubscribe} disabled={isSubscribed}>
        알림 구독하기
      </button>

      {/* 구독 해제 버튼 */}
      <button onClick={unsubscribe} disabled={!isSubscribed}>
        구독 해제하기
      </button>
    </div>
  );
}
```

## 알림 보내기

```tsx
import { showNotification } from "@fliklab/react-push-notification";

// 기본 알림
await showNotification("안녕하세요!");

// 상세 옵션을 포함한 알림
await showNotification("새 메시지가 도착했습니다", {
  body: "홍길동님으로부터 새 메시지가 도착했습니다.",
  icon: "/path/to/icon.png",
  badge: "/path/to/badge.png",
  image: "/path/to/image.png",
  tag: "message-notification",
  data: {
    messageId: "123",
    url: "https://example.com/message/123",
  },
  requireInteraction: true,
  actions: [
    {
      action: "reply",
      title: "답장하기",
    },
    {
      action: "close",
      title: "닫기",
    },
  ],
});
```

## API 레퍼런스

### usePushNotification

알림 구독 관리를 위한 React 훅입니다.

```typescript
const {
  isSubscribed: boolean,    // 현재 알림 구독 상태
  error: string | null,     // 에러 메시지
  subscribe: () => Promise<void>,    // 알림 구독 함수
  unsubscribe: () => void   // 구독 해제 함수
} = usePushNotification();
```

### showNotification

알림을 표시하는 함수입니다.

```typescript
function showNotification(
  title: string,
  options?: NotificationOptions
): Promise<void>;
```

#### NotificationOptions

| 옵션                 | 타입                 | 설명                      |
| -------------------- | -------------------- | ------------------------- |
| `body`               | string               | 알림 본문 내용            |
| `icon`               | string               | 알림 아이콘 URL           |
| `badge`              | string               | 알림 뱃지 URL             |
| `image`              | string               | 알림에 표시될 이미지 URL  |
| `tag`                | string               | 알림 그룹화를 위한 태그   |
| `data`               | any                  | 알림과 함께 전달할 데이터 |
| `requireInteraction` | boolean              | 사용자 상호작용 필요 여부 |
| `actions`            | NotificationAction[] | 알림 액션 버튼 설정       |

## 브라우저 지원

- Chrome 50+
- Firefox 44+
- Edge 17+
- Safari 16.4+
- Opera 37+

## 주의사항

1. HTTPS 환경에서만 작동합니다.
2. 사용자가 알림 권한을 명시적으로 허용해야 합니다.
3. Safari의 경우 일부 기능이 제한될 수 있습니다.

## 라이선스

MIT

## 기여하기

이슈와 풀 리퀘스트는 언제나 환영합니다. 기여하시기 전에 다음 사항을 확인해주세요:

1. 이슈 템플릿 확인
2. 테스트 코드 작성
3. 문서 업데이트

## 문의

문제가 발생하거나 질문이 있으시다면 GitHub Issues를 통해 문의해주세요.
