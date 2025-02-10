import { AuthToastProps } from "@interface/auth/interfaces";
import { toast, ToastOptions } from "react-toastify";

const authToastOptions: ToastOptions = {
  style: { background: "#806cf2", color: "#fff" },
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const authToast = ({ type, message }: AuthToastProps) => {
  toast[type](message, authToastOptions);
};