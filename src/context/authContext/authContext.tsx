import React, { createContext, useContext, useState } from "react";

import { AuthContextType } from "@interface/auth/interfaces";

import { authToast } from "@config/authToast";
import { AUTH_TEXT } from "@utils/authConstants";
import { signIn, signUp } from "@services/auth.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleSignInSubmit = async (email: string, password: string) => {
    try {
      const response = await signIn({ email, password });
      const { message, data } = response;

      data?.token
        ? (() => {
            setIsAuthenticated(true);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            localStorage.setItem("tokenExpiry", expiryDate.toISOString());
          })()
        : authToast({ type: "error", message });
    } catch (error: any) {
      authToast({ type: "error", message: error.response?.data?.message });
    }
  };

  const handleSignUpSubmit = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await signUp({ username, email, password });
      const { message } = response;
      authToast({ type: "success", message });
      await handleSignInSubmit(email, password);
    } catch (error: any) {
      const customMessage =
        "Password must be at least 8 characters long and include at least one number, one uppercase letter, and one symbol.";
      authToast({ type: "error", message: customMessage });
    }
  };

  const toggleAuthMode = () => setIsSignIn((prev) => !prev);

  return (
    <AuthContext.Provider
      value={{
        isSignIn,
        toggleAuthMode,
        handleSignInSubmit,
        handleSignUpSubmit,
        currentTitle: isSignIn
          ? AUTH_TEXT.SIGNIN.TITLE
          : AUTH_TEXT.SIGNUP.TITLE,
        currentDescription: isSignIn
          ? AUTH_TEXT.SIGNIN.DESCRIPTION
          : AUTH_TEXT.SIGNUP.DESCRIPTION,
        currentButton: isSignIn
          ? AUTH_TEXT.SIGNIN.BUTTON
          : AUTH_TEXT.SIGNUP.BUTTON,
        toggleButtonAriaLabel: isSignIn
          ? AUTH_TEXT.TOGGLE_BUTTON_ARIA_LABEL.SIGNIN
          : AUTH_TEXT.TOGGLE_BUTTON_ARIA_LABEL.SIGNUP,
        prefilledLogin: { email: "", password: "" },
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context
    ? context
    : (() => {
        throw new Error("useAuthContext must be used within an AuthProvider");
      })();
};
