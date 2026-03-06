import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";

const AuthRedirectRoutes = () => {
  const { isAuth } = useAuthStore();

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRedirectRoutes;
