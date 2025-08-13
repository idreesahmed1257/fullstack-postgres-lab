import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div>{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
