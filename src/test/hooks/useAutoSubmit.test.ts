import useAutoSubmit from "@hooks/useAutoSubmit";
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

describe("useAutoSubmit", () => {
  it("sets input values and calls onSubmit when refs are available and default values are provided", () => {
    const emailRef = {
      current: { value: "" },
    } as React.RefObject<HTMLInputElement>;
    const passwordRef = {
      current: { value: "" },
    } as React.RefObject<HTMLInputElement>;
    const onSubmit = vi.fn();
    const defaultEmail = "test@example.com";
    const defaultPassword = "password123";

    renderHook(() =>
      useAutoSubmit({
        emailRef,
        passwordRef,
        defaultEmail,
        defaultPassword,
        onSubmit,
      })
    );

    expect(emailRef.current?.value).toBe(defaultEmail);
    expect(passwordRef.current?.value).toBe(defaultPassword);
    expect(onSubmit).toHaveBeenCalledWith(defaultEmail, defaultPassword);
  });

  it("does not call onSubmit when either defaultEmail or defaultPassword is empty", () => {
    const emailRef = {
      current: { value: "" },
    } as React.RefObject<HTMLInputElement>;
    const passwordRef = {
      current: { value: "" },
    } as React.RefObject<HTMLInputElement>;
    const onSubmit = vi.fn();
    const defaultEmail = "";
    const defaultPassword = "password123";

    renderHook(() =>
      useAutoSubmit({
        emailRef,
        passwordRef,
        defaultEmail,
        defaultPassword,
        onSubmit,
      })
    );

    expect(emailRef.current?.value).toBe(defaultEmail);
    expect(passwordRef.current?.value).toBe(defaultPassword);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
