import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to dashboard if not an admin
  if (user.role !== "Admin") {
    return <Navigate to="/dashboard" />;
  }

  // Allow access to admin routes
  return <Outlet />;
};

export default AdminRoute;