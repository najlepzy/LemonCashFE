export interface AuthContextType {
  isSignIn: boolean;
  toggleAuthMode: () => void;
  handleSignInSubmit: (email: string, password: string) => Promise<void>;
  handleSignUpSubmit: (
    username: string,
    email: string,
    password: string
  ) => void;
  currentTitle: string;
  currentDescription: string;
  currentButton: string;
  toggleButtonAriaLabel: string;
  isAuthenticated: boolean;
  user: any;
  prefilledLogin: { email: string; password: string } | null;
}
export interface ExtendedSignInProps extends SignInProps {
  defaultEmail?: string;
  defaultPassword?: string;
}

export interface SignInProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export interface SignUpProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

export interface AuthToastProps {
  type: "success" | "error";
  message: string;
}