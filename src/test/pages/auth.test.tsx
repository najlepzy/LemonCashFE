import { render, screen } from "@testing-library/react";
import Auth from "@pages/auth";

vi.mock("@components/index", () => {
  return {
    AuthContent: () => <div>Auth Content</div>,
  };
});

vi.mock("react-toastify", () => {
  return {
    ToastContainer: () => (
      <div data-testid="toast-container" className="Toastify__toast-container" />
    ),
    toast: vi.fn(),
  };
});

describe("Auth", () => {
  it("renders AuthContent and ToastContainer", () => {
    render(<Auth />);
    expect(screen.getByText("Auth Content")).toBeTruthy();
    expect(screen.getByTestId("toast-container")).toBeTruthy();
  });
});
