import { useEffect, useRef } from "react";

const useAutoFocus = (shouldFocus: boolean) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    shouldFocus ? inputRef.current?.focus() : null;
  }, [shouldFocus]);

  return inputRef;
};

export default useAutoFocus;