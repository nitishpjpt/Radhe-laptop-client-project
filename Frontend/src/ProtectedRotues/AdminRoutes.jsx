import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
