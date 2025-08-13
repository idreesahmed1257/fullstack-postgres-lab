import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import PrivateLayoutRoutes from "./PrivateLayoutRoutes";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import Profile from "../../pages/Profile";
import AuthRedirectRoutes from "./AuthRedirectRoutes";
import Cart from "../../pages/Cart";

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateLayoutRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<PublicLayoutRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<AuthRedirectRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MyRouter;
