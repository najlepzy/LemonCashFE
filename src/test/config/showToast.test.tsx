import { vi } from "vitest";
import { toast } from "react-toastify";

let showAuthToast: (type: "success" | "error", content: React.ReactNode, options?: any) => void;

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("showAuthToast", () => {
  beforeEach(async () => {
    vi.resetModules();
    const collabToast = await import("@config/collabToast");
    showAuthToast = collabToast.showAuthToast;
    vi.useFakeTimers();
    vi.setSystemTime(3000);
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("calls toast if delay passed", () => {
    showAuthToast("error", "Auth error");
    expect(toast.error).toHaveBeenCalledWith("Auth error", {
      style: { background: "#806cf2", color: "#fff" },
      position: "top-center",
      autoClose: 2000,
    });
  });
  it("does not call toast if called too quickly", () => {
    showAuthToast("success", "First call");
    expect(toast.success).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1000);
    showAuthToast("success", "Second call");
    expect(toast.success).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(2000);
    showAuthToast("success", "Third call");
    expect(toast.success).toHaveBeenCalledTimes(2);
  });
});
