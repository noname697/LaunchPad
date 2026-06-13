import { Navigate, Outlet } from "react-router";
import { getUser } from "../utils/storage";

const PublicRoute = () => {
  const user = getUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
