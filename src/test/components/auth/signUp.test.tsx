import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { SIGNUP_TEXT } from "@utils/authConstants";
import { AuthProvider } from "@context/authContext/authContext";
import { SignUp } from "@components/index";

// Definimos el spy para onSubmit (handleSignUpSubmit)
const handleSignUpSubmit = vi.fn();

vi.mock("@hooks/index", () => ({
  useAuthRedirect: () => {},
}));

vi.mock("@context/authContext/authContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuthContext: () => ({
    isSignIn: false,
    toggleAuthMode: vi.fn(),
    handleSignInSubmit: vi.fn(),
    currentTitle: SIGNUP_TEXT.TITLE,
    currentButton: SIGNUP_TEXT.SUBMIT,
    toggleButtonAriaLabel: "Switch mode",
    prefilledLogin: { email: "", password: "" },
    isAuthenticated: false,
    user: null,
  }),
}));

describe("SignUp", () => {
  beforeEach(() => {
    handleSignUpSubmit.mockClear();
  });

  it("renders SignUp form", () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SignUp onSubmit={handleSignUpSubmit} />
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

  it("calls handleSignUpSubmit with username, email, password on form submission", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <SignUp onSubmit={handleSignUpSubmit} />
        </AuthProvider>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText(
      SIGNUP_TEXT.PLACEHOLDER_USERNAME
    );
    const emailInput = screen.getByPlaceholderText(
      SIGNUP_TEXT.PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText(
      SIGNUP_TEXT.PLACEHOLDER_PASSWORD
    );

    // Simulamos que el usuario escribe en los campos
    await user.type(usernameInput, "TestUser");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");

    // Simulamos el click en el botón de submit
    const submitButton = screen.getByRole("button", {
      name: SIGNUP_TEXT.SUBMIT,
    });
    await user.click(submitButton);

    // Esperamos que se llame la función onSubmit con los argumentos correspondientes
    await waitFor(() => {
      expect(handleSignUpSubmit).toHaveBeenCalledWith(
        "TestUser",
        "test@example.com",
        "password"
      );
    });
  });
});
