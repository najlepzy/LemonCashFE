import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { AuthProvider, useAuthContext } from "@context/authContext/authContext";
import { renderHook } from "@testing-library/react";
import { act } from "react";

vi.mock("@services/auth.service", () => ({
  signIn: vi.fn(),
  signUp: vi.fn()
}));

vi.mock("@config/authToast", () => ({
  authToast: vi.fn()
}));

import { signIn } from "@services/auth.service";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("throws error when useAuthContext is used outside provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useAuthContext())).toThrow();
    consoleError.mockRestore();
  });

  it("provides default values and toggles auth mode", async () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });

    expect(result.current.isSignIn).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();

    await act(async () => {
      result.current.toggleAuthMode();
    });

    expect(result.current.isSignIn).toBe(true);
  });

  it("handles successful sign in", async () => {
    const mockUser = { id: "1", name: "Test User" };
    const mockToken = "test-token";

    vi.mocked(signIn).mockResolvedValueOnce({
      message: "Success",
      data: { token: mockToken, user: mockUser },
    });

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    await act(async () => {
      await result.current.handleSignInSubmit("test@example.com", "password");
    });

    expect(signIn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem("token")).toBe(mockToken);
  });
});