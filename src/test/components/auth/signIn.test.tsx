import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@context/authContext/authContext";
import { SIGNIN_TEXT } from "@utils/authConstants";
import { SignIn } from "@components/index";

describe("SignIn", () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  it("renders SignIn form with all elements", () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn onSubmit={onSubmit} />
        </AuthProvider>
      </MemoryRouter>
    );

    const signInElements = screen.getAllByText(SIGNIN_TEXT.TITLE);
    expect(signInElements.length).toBeGreaterThan(0);

    expect(
      screen.getByPlaceholderText(SIGNIN_TEXT.PLACEHOLDER_EMAIL)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(SIGNIN_TEXT.PLACEHOLDER_PASSWORD)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: SIGNIN_TEXT.SUBMIT })
    ).toBeInTheDocument();
    expect(container.querySelector("form")).toBeTruthy();
  });

  it("handles form submission with email and password", () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SignIn onSubmit={onSubmit} />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(
      SIGNIN_TEXT.PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText(
      SIGNIN_TEXT.PLACEHOLDER_PASSWORD
    );
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const form = container.querySelector("form");
    if (form) fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith("test@example.com", "password123");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
