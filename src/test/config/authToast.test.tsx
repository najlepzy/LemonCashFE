import { vi } from "vitest";
import { toast } from "react-toastify";
import { authToast } from "@config/authToast";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("authToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("calls toast.success with message and options", () => {
    authToast({ type: "success", message: "Test auth message" });
    expect(toast.success).toHaveBeenCalledWith("Test auth message", {
      style: { background: "#806cf2", color: "#fff" },
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  });
});
