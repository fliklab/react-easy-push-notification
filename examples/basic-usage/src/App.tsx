import {
  usePushNotification,
  sendNotification,
} from "@fliklab/react-push-notification";

function App() {
  const { isSubscribed, error, subscribe, unsubscribe } = usePushNotification();

  const handleSendNotification = () => {
    sendNotification("테스트 알림", {
      body: "이것은 테스트 알림입니다.",
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>@fliklab/react-push-notification 예제</h1>
      <p>현재 구독 상태: {isSubscribed ? "구독 중" : "미구독"}</p>
      {error && <p style={{ color: "red" }}>에러: {error}</p>}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={() => subscribe()} disabled={isSubscribed}>
          알림 구독
        </button>
        <button onClick={() => unsubscribe()} disabled={!isSubscribed}>
          구독 해제
        </button>
        <button onClick={handleSendNotification} disabled={!isSubscribed}>
          테스트 알림 보내기
        </button>
      </div>
    </div>
  );
}

export default App;
