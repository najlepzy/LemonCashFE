import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "@pages/auth";
import TaskManager from "@pages/taskManager";
import PublicRoute from "@guard/public/public";
import AuthWall from "@guard/authWall";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/auth/*" element={<Auth />} />
      </Route>
      <Route element={<AuthWall />}>
        <Route path="/taskmanager/*" element={<TaskManager />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default AppRoutes;