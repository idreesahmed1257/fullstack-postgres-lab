import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores";
import Layout from "./Layout";

const PrivateLayoutRoutes = () => {
  const { isAuth } = useAuthStore();

  return isAuth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayoutRoutes;
