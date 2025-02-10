import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@context/authContext/authContext";

import { SIGNUP_TEXT } from "@utils/authConstants";
import { SignUp } from "@components/index";

vi.mock("@hooks/index", () => ({
  useAuthRedirect: () => {},
}));

vi.mock("@context/authContext/authContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAuthContext: () => ({
    isSignIn: false,
    toggleAuthMode: vi.fn(),
    handleSignInSubmit: vi.fn(),
    handleSignUpSubmit: vi.fn(),
    currentTitle: SIGNUP_TEXT.TITLE,
    currentButton: SIGNUP_TEXT.SUBMIT,
    toggleButtonAriaLabel: "Switch mode",
    prefilledLogin: { email: "", password: "" },
    isAuthenticated: false,
    user: null,
  }),
}));

describe("SignUp", () => {
  const onSubmit = vi.fn();
  beforeEach(() => onSubmit.mockClear());

  it("renders SignUp form", () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SignUp onSubmit={onSubmit} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(SIGNUP_TEXT.TITLE)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(SIGNUP_TEXT.PLACEHOLDER_USERNAME)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(SIGNUP_TEXT.PLACEHOLDER_EMAIL)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(SIGNUP_TEXT.PLACEHOLDER_PASSWORD)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: SIGNUP_TEXT.SUBMIT })
    ).toBeInTheDocument();
    expect(container.querySelector("form")).toBeTruthy();
  });

  it("calls onSubmit with username, email, password on form submission", () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SignUp onSubmit={onSubmit} />
        </AuthProvider>
      </MemoryRouter>
    );
    const usernameInput = screen.getByPlaceholderText(
      SIGNUP_TEXT.PLACEHOLDER_USERNAME
    );
    const emailInput = screen.getByPlaceholderText(
      SIGNUP_TEXT.PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText(
      SIGNUP_TEXT.PLACEHOLDER_PASSWORD
    );
    fireEvent.change(usernameInput, { target: { value: "TestUser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    const form = container.querySelector("form");
    if (form) fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalledWith(
      "TestUser",
      "test@example.com",
      "password"
    );
  });
});
