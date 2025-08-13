import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../Redux/store";

const AuthRedirectRoutes = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRedirectRoutes;
