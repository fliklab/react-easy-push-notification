import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  sendNotification,
  scheduleNotification,
  cancelScheduledNotification,
  registerServiceWorker,
  requestNotificationPermission,
} from "../src/utils/notification";

// Mock Notification API
const MockNotification = vi.fn();
const mockRequestPermission = vi.fn();

// Mock Service Worker
const mockSWShowNotification = vi.fn();
const mockSWRegister = vi.fn();

vi.stubGlobal("Notification", MockNotification);
Object.defineProperty(window, "Notification", {
  value: MockNotification,
  writable: true,
});
Object.defineProperty(Notification, "permission", {
  writable: true,
});
Object.defineProperty(Notification, "requestPermission", {
  value: mockRequestPermission,
  writable: true,
});

vi.stubGlobal("navigator", {
  serviceWorker: {
    ready: Promise.resolve({
      showNotification: mockSWShowNotification,
    }),
    register: mockSWRegister,
  },
});

describe("Notification Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // Use fake timers for scheduling
    Object.defineProperty(Notification, "permission", { value: "default" });
    mockSWRegister.mockResolvedValue({
      showNotification: mockSWShowNotification,
    });
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers
  });

  describe("registerServiceWorker", () => {
    it("should register a service worker", async () => {
      await registerServiceWorker();
      expect(mockSWRegister).toHaveBeenCalledWith("/service-worker.ts", {
        scope: "/",
      });
    });
  });

  describe("requestNotificationPermission", () => {
    it("should return true and register service worker when permission is granted", async () => {
      mockRequestPermission.mockResolvedValue("granted");
      const result = await requestNotificationPermission();
      expect(result).toBe(true);
      expect(mockSWRegister).toHaveBeenCalled();
    });

    it("should return false when permission is denied", async () => {
      mockRequestPermission.mockResolvedValue("denied");
      const result = await requestNotificationPermission();
      expect(result).toBe(false);
    });

    it("should handle request failure", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockRequestPermission.mockRejectedValueOnce(new Error("Request failed"));

      const result = await requestNotificationPermission();

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error requesting notification permission:",
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("sendNotification", () => {
    it("TC-UTIL-01: should create a notification when permission is granted", () => {
      Object.defineProperty(window.Notification, "permission", {
        value: "granted",
        writable: true,
      });

      const title = "Test Title";
      const options = { body: "Test Body" };

      sendNotification(title, options);

      expect(MockNotification).toHaveBeenCalledWith(title, options);
    });

    it("TC-UTIL-02: should not create a notification when permission is denied", () => {
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

  describe("scheduleNotification", () => {
    it("should schedule a notification to be sent in the future", () => {
      Object.defineProperty(window.Notification, "permission", {
        value: "granted",
        writable: true,
      });
      const title = "Scheduled Notification";
      const scheduledTime = new Date(Date.now() + 5000); // 5 seconds in the future

      scheduleNotification(title, scheduledTime);

      expect(MockNotification).not.toHaveBeenCalled();

      // Advance time by 5 seconds
      vi.advanceTimersByTime(5000);

      expect(MockNotification).toHaveBeenCalledWith(title, undefined);
    });
  });

  describe("cancelScheduledNotification", () => {
    it("should cancel a scheduled notification", () => {
      Object.defineProperty(window.Notification, "permission", {
        value: "granted",
        writable: true,
      });
      const title = "To be cancelled";
      const scheduledTime = new Date(Date.now() + 5000);

      const timeoutId = scheduleNotification(title, scheduledTime);
      cancelScheduledNotification(timeoutId);

      // Advance time
      vi.advanceTimersByTime(5000);

      expect(MockNotification).not.toHaveBeenCalled();
    });
  });
});
