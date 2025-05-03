// ProtectedRoute.jsx（改良版）

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(rawUser);
  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
