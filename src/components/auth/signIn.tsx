import React, { useRef } from "react";
import { useAuthRedirect, useAutoSubmit } from "@hooks/index";
import { SIGNIN_TEXT } from "@utils/authConstants";
import { ExtendedSignInProps } from "@interface/auth/interfaces";

const SignIn: React.FC<ExtendedSignInProps> = ({
  onSubmit,
  defaultEmail = "",
  defaultPassword = "",
}) => {
  useAuthRedirect();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useAutoSubmit({
    emailRef,
    passwordRef,
    defaultEmail,
    defaultPassword,
    onSubmit,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    await onSubmit(email, password);
    form.reset();
  };

  return (
    <div className="signin-form">
      <h2>{SIGNIN_TEXT.TITLE}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signin-email" className="sr-only">
          {SIGNIN_TEXT.EMAIL}
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          placeholder={SIGNIN_TEXT.PLACEHOLDER_EMAIL}
          required
          ref={emailRef}
        />
        <label htmlFor="signin-password" className="sr-only">
          {SIGNIN_TEXT.PASSWORD}
        </label>
        <input
          id="signin-password"
          name="password"
          type="password"
          placeholder={SIGNIN_TEXT.PLACEHOLDER_PASSWORD}
          required
          ref={passwordRef}
        />
        <button type="submit" className="sign-in-submit">
          {SIGNIN_TEXT.SUBMIT}
        </button>
      </form>
    </div>
  );
};

export default SignIn;