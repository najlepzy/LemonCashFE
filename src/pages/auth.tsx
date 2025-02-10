import React from "react";
import { AuthContent } from "@components/index";
import { AuthProvider } from "@context/authContext/authContext";
import { ToastContainer } from "react-toastify";

const Auth: React.FC = () => {
  return (
    <AuthProvider>
      <AuthContent />
      <ToastContainer />
    </AuthProvider>
  );
};

export default Auth;