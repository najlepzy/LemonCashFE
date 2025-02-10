import { useEffect, RefObject } from "react";

interface UseAutoSubmitProps {
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  defaultEmail: string;
  defaultPassword: string;
  onSubmit: (email: string, password: string) => void;
}

const useAutoSubmit = ({
  emailRef,
  passwordRef,
  defaultEmail,
  defaultPassword,
  onSubmit,
}: UseAutoSubmitProps) => {
  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = defaultEmail;
      passwordRef.current.value = defaultPassword;
      if (defaultEmail && defaultPassword) {
        onSubmit(defaultEmail, defaultPassword);
      }
    }
  }, [defaultEmail, defaultPassword, onSubmit, emailRef, passwordRef]);
};

export default useAutoSubmit;