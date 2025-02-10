import { TaskToastProps } from "@interface/tasks/interfaces";
import { toast, ToastOptions } from "react-toastify";

const taskToastOptions: ToastOptions = {
  style: { background: "#806cf2", color: "#fff" },
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const taskToast = (
  { type, message }: TaskToastProps,
  options?: ToastOptions
) => {
  toast[type](message, { ...taskToastOptions, ...options });
};
