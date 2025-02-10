import React from "react";
import { Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
  }
  return <Outlet />;
};

export default PublicRoute;
