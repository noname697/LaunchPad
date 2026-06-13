import { Navigate, Outlet } from "react-router";
import { getUser } from "../utils/storage";

const ProtectedRoute = () => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
