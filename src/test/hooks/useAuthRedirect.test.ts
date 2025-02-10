import { renderHook } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import useAuthRedirect from "../../hooks/useAuthRedirect";

vi.mock("@context/authContext/authContext", () => ({
  useAuthContext: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

import { useAuthContext } from "@context/authContext/authContext";
import { useNavigate, useLocation } from "react-router-dom";

describe("useAuthRedirect", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    (useLocation as unknown as Mock).mockReturnValue({ pathname: "/login" });
  });

  it('redirects to "/taskmanager" when the user is authenticated', () => {
    (useAuthContext as unknown as Mock).mockReturnValue({
      isAuthenticated: true,
    });

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).toHaveBeenCalledWith("/taskmanager");
  });

  it("does not redirect when the user is not authenticated", () => {
    (useAuthContext as unknown as Mock).mockReturnValue({
      isAuthenticated: false,
    });

    renderHook(() => useAuthRedirect());

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
