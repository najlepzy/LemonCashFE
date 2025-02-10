import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!token || !tokenExpiry) return false;
  if (new Date(tokenExpiry) < new Date()) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return false;
  }
  return true;
};

const AuthGuard: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default AuthGuard;