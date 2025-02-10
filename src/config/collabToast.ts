import { toast, ToastOptions } from "react-toastify";

const toastBaseOptions: ToastOptions = {
  style: { background: "#806cf2", color: "#fff" },
  position: "bottom-right",
  autoClose: 2000,
};

export const showToast = (
  type: "success" | "error" | "info",
  content: React.ReactNode,
  options?: ToastOptions
) => {
  toast[type](content, { ...toastBaseOptions, ...options });
};

const authToastOptions: ToastOptions = {
  style: { background: "#806cf2", color: "#fff" },
  position: "top-center",
  autoClose: 2000,
};

let lastAuthToastTime = 0;
const toastDelay = 2000;

export const showAuthToast = (
  type: "success" | "error",
  content: React.ReactNode,
  options?: ToastOptions
) => {
  const now = Date.now();
  if (now - lastAuthToastTime < toastDelay) return;
  lastAuthToastTime = now;
  toast[type](content, { ...authToastOptions, ...options });
};