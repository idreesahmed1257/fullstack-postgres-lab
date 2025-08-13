import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../Redux/store";
import Layout from "./Layout";

const PrivateLayoutRoutes = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return isAuth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayoutRoutes;
