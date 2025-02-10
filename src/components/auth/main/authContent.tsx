import React from "react";
import "@styles/auth.css";
import { useAuthContext } from "@context/authContext/authContext";
import { SignIn, SignUp } from "@components/index";

const AuthContent: React.FC = () => {
  const {
    isSignIn,
    toggleAuthMode,
    handleSignInSubmit,
    handleSignUpSubmit,
    currentTitle,
    currentDescription,
    currentButton,
    toggleButtonAriaLabel,
  } = useAuthContext();

  return (
    <main>
      <div className={`auth-container ${isSignIn ? "sign-in-mode" : ""}`}>
        <div className="auth-card">
          <div className="auth-left">
            <div className="welcome-text">
              <h2>{currentTitle}</h2>
              <p>
                {currentDescription.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <button
                className="btn"
                onClick={toggleAuthMode}
                aria-label={toggleButtonAriaLabel}
              >
                {currentButton}
              </button>
            </div>
          </div>
          <div className="auth-right">
            {isSignIn ? (
              <SignIn onSubmit={handleSignInSubmit} />
            ) : (
              <SignUp onSubmit={handleSignUpSubmit} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthContent;
