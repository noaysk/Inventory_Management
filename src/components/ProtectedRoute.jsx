import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;  // ✅ 権限なしなら `/login` にリダイレクト！
  }
  return children;
};

export default ProtectedRoute;
