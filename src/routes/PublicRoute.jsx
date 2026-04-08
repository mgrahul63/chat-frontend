import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { authUser, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return !authUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
