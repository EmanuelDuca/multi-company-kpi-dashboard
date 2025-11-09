import { Navigate, Outlet } from "react-router-dom";

// TODO: Replace with actual authentication logic
const useAuth = () => {
  // For now, return true. Later integrate with your auth system
  return { isAuthenticated: true };
};

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
