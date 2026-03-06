import { Outlet } from "react-router-dom";
import Layout from "./Layout";

const PublicLayoutRoutes = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicLayoutRoutes;
