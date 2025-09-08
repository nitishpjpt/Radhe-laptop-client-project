import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
