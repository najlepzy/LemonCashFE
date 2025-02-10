import { vi } from "vitest";
import { toast } from "react-toastify";
import { taskToast } from "@config/taskToast";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("taskToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("calls toast.success with merged options", () => {
    taskToast(
      { type: "success", message: "Task updated" },
      { autoClose: 3000 }
    );
    expect(toast.success).toHaveBeenCalledWith("Task updated", {
      style: { background: "#806cf2", color: "#fff" },
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  });
});
