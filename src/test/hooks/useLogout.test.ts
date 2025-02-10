import { renderHook, act } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@hooks/index";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("useLogout", () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    localStorage.setItem("token", "dummy");
    localStorage.setItem("tokenExpiry", "dummyExpiry");
  });
  it("removes token and tokenExpiry and navigates to /auth", () => {
    const { result } = renderHook(() => useLogout());
    act(() => {
      result.current();
    });
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("tokenExpiry")).toBe(null);
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });
});
