import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ children, redirectPath = "/login" }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default RequireAuth;
