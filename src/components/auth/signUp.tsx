import React from "react";
import { SignUpProps } from "@interface/auth/interfaces";
import { useAuthRedirect } from "@hooks/index";
import { SIGNUP_TEXT } from "@utils/authConstants";

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  useAuthRedirect();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    await onSubmit(username, email, password);
    form.reset();
  };

  return (
    <div className="signup-form">
      <h2>{SIGNUP_TEXT.TITLE}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signup-username" className="sr-only">
          {SIGNUP_TEXT.USERNAME}
        </label>
        <input
          id="signup-username"
          name="username"
          type="text"
          placeholder={SIGNUP_TEXT.PLACEHOLDER_USERNAME}
          required
        />
        <label htmlFor="signup-email" className="sr-only">
          {SIGNUP_TEXT.EMAIL}
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          placeholder={SIGNUP_TEXT.PLACEHOLDER_EMAIL}
          required
        />
        <label htmlFor="signup-password" className="sr-only">
          {SIGNUP_TEXT.PASSWORD}
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          placeholder={SIGNUP_TEXT.PLACEHOLDER_PASSWORD}
          required
        />
        <button type="submit" className="sign-up-btn">
          {SIGNUP_TEXT.SUBMIT}
        </button>
      </form>
    </div>
  );
};

export default SignUp;