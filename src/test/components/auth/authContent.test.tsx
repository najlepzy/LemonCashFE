import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@context/authContext/authContext";
import { AuthContent } from "@components/index";

const mockToggleAuthMode = vi.fn();
const mockHandleSignInSubmit = vi.fn();
const mockHandleSignUpSubmit = vi.fn();

vi.mock("@context/authContext/authContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuthContext: () => ({
    isSignIn: true,
    toggleAuthMode: mockToggleAuthMode,
    handleSignInSubmit: mockHandleSignInSubmit,
    handleSignUpSubmit: mockHandleSignUpSubmit,
    currentTitle: "Sign In",
    currentDescription: "Sign in to your account",
    currentButton: "Sign Up",
    toggleButtonAriaLabel: "Switch to sign up",
    prefilledLogin: { email: "", password: "" },
    isAuthenticated: false,
    user: null,
  }),
}));

describe("AuthContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders auth content correctly", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthContent />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Switch to sign up" })).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  it("calls toggleAuthMode when switch button is clicked", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthContent />
        </AuthProvider>
      </MemoryRouter>
    );

    const switchButton = screen.getByRole("button", { name: "Switch to sign up" });
    fireEvent.click(switchButton);
    
    expect(mockToggleAuthMode).toHaveBeenCalledTimes(1);
  });

  it("submits form with correct data", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthContent />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockHandleSignInSubmit).toHaveBeenCalledTimes(1);
  });
});