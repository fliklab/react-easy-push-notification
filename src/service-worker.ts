/// <reference lib="webworker" />

// Service Worker for background notifications
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event: any) => {
  event.waitUntil(self.clients.claim());
});

// 백그라운드에서 알림 처리
self.addEventListener("push", (event: any) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.content,
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    timestamp: new Date(data.scheduledAt).getTime(),
    tag: data.id,
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 알림 클릭 처리
self.addEventListener("notificationclick", (event: any) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
