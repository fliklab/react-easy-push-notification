# React Easy Push

브라우저 푸시 알림을 쉽게 테스트하고 구현할 수 있는 React 컴포넌트 라이브러리입니다.

## 주요 기능

- 브라우저 푸시 알림 권한 요청 및 관리
- 푸시 알림 구독/취소 기능
- 커스텀 가능한 알림 디자인
- TypeScript 지원
- 간단한 훅 기반 API

## 설치 방법

```bash
# npm
npm install react-easy-push

# yarn
yarn add react-easy-push

# pnpm
pnpm add react-easy-push
```

## 사용 예시

```tsx
import { usePushNotification } from "react-easy-push";

function App() {
  const { requestPermission, subscription, sendNotification } =
    usePushNotification();

  return (
    <div>
      <button onClick={requestPermission}>알림 권한 요청</button>
      <button
        onClick={() =>
          sendNotification({
            title: "테스트 알림",
            body: "이것은 테스트 알림입니다.",
          })
        }
      >
        테스트 알림 보내기
      </button>
    </div>
  );
}
```

## 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 테스트 실행
pnpm test

# 빌드
pnpm build
```

## 브라우저 지원

- Chrome 50+
- Firefox 44+
- Edge 17+
- Safari 16.4+
- Opera 37+

## 라이선스

MIT

## 기여하기

이슈와 풀 리퀘스트는 언제나 환영합니다. 기여하시기 전에 다음 사항을 확인해주세요:

1. 이슈 템플릿 확인
2. 테스트 코드 작성
3. 문서 업데이트

## 문의

문제가 발생하거나 질문이 있으시다면 GitHub Issues를 통해 문의해주세요.
