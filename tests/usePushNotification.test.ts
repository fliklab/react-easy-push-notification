import { renderHook, act } from "@testing-library/react";
import { usePushNotification } from "../src/hooks/usePushNotification";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Notification API
const mockNotification = {
  requestPermission: vi.fn(),
  permission: "default",
};

vi.stubGlobal("Notification", mockNotification);

describe("usePushNotification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset permission for each test
    Object.defineProperty(window.Notification, "permission", {
      value: "default",
      writable: true,
    });
  });

  it("TC-HOOK-01: should initialize with default values", () => {
    const { result } = renderHook(() => usePushNotification());
    expect(result.current.isSubscribed).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("TC-HOOK-02: should subscribe successfully when permission is granted", async () => {
    mockNotification.requestPermission.mockResolvedValue("granted");
    Object.defineProperty(window.Notification, "permission", {
      value: "granted",
      writable: true,
    });

    const { result } = renderHook(() => usePushNotification());

    await act(async () => {
      await result.current.subscribe();
    });

    expect(result.current.isSubscribed).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("TC-HOOK-03: should handle subscription failure when permission is denied", async () => {
    mockNotification.requestPermission.mockResolvedValue("denied");
    Object.defineProperty(window.Notification, "permission", {
      value: "denied",
      writable: true,
    });

    const { result } = renderHook(() => usePushNotification());

    await act(async () => {
      await result.current.subscribe();
    });

    expect(result.current.isSubscribed).toBe(false);
    expect(result.current.error).toBe("알림 권한이 거부되었습니다.");
  });

  it("TC-HOOK-04: should unsubscribe successfully", async () => {
    // First, subscribe
    mockNotification.requestPermission.mockResolvedValue("granted");
    Object.defineProperty(window.Notification, "permission", {
      value: "granted",
      writable: true,
    });
    const { result } = renderHook(() => usePushNotification());
    await act(async () => {
      await result.current.subscribe();
    });
    expect(result.current.isSubscribed).toBe(true);

    // Then, unsubscribe
    act(() => {
      result.current.unsubscribe();
    });

    expect(result.current.isSubscribed).toBe(false);
  });
});
