import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendNotification } from "../src/utils/notification";

// Mock Service Worker
const mockServiceWorkerRegistration = {
  showNotification: vi.fn(),
};

// Mock Navigator
vi.stubGlobal("navigator", {
  serviceWorker: {
    ready: Promise.resolve(mockServiceWorkerRegistration),
  },
});

// Mock Notification API
const MockNotification = vi.fn();
vi.stubGlobal("Notification", MockNotification);
Object.defineProperty(window.Notification, "permission", {
  value: "default",
  writable: true,
});

describe("sendNotification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("TC-UTIL-01: should create a notification when permission is granted", async () => {
    Object.defineProperty(window.Notification, "permission", {
      value: "granted",
      writable: true,
    });

    const title = "Test Title";
    const options = { body: "Test Body" };

    sendNotification(title, options);

    expect(MockNotification).toHaveBeenCalledWith(title, options);
  });

  it("TC-UTIL-02: should not create a notification when permission is denied", async () => {
    Object.defineProperty(window.Notification, "permission", {
      value: "denied",
      writable: true,
    });

    const title = "Test Title";

    sendNotification(title);

    expect(MockNotification).not.toHaveBeenCalled();
  });

  it("should not create a notification when permission is default", async () => {
    Object.defineProperty(window.Notification, "permission", {
      value: "default",
      writable: true,
    });

    const title = "Test Title";

    sendNotification(title);

    expect(MockNotification).not.toHaveBeenCalled();
  });
});
