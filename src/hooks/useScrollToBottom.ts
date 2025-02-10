import { useEffect, RefObject } from "react";

const useScrollToBottom = (ref: RefObject<HTMLElement>, dependency: any) => {
  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [dependency, ref]);
};

export default useScrollToBottom;