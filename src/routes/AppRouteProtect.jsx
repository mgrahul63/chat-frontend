import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { authUser, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // wait for auth check
  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
