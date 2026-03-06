import { PersonOutlineOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "../../../assets/LoginIcon";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useAuthStore, useProductStore } from "../../../stores";

const Navbar = () => {
  const { isAuth } = useAuthStore();
  const { cartItems } = useProductStore();
  const navigate = useNavigate();

  const handleSignInClick = () => navigate("/login");

  const handleCartClick = () => {
    if (!isAuth) {
      toast.error("Please Login to Checkout");
      return;
    }
    navigate("/cart");
  };

  return (
    <div className="flex items-center justify-between px-8 py-2 border-b border-bg-paper">
      <Link to="/" className="flex items-center gap-1 text-[22px] font-extrabold cursor-pointer no-underline">
        <LoginIcon />
        <p className="text-text-dark">Giftly</p>
      </Link>

      <div className="flex items-center gap-2">
        <Badge badgeContent={cartItems?.length} color="primary">
          <IconButton onClick={handleCartClick} className={`h-[30px] rounded border border-primary ${cartItems?.length ? "bg-primary text-bg-main" : "bg-bg-main text-primary"}`}>
            <ShoppingCartOutlined />
          </IconButton>
        </Badge>

        {isAuth ? (
          <ProfileCard />
        ) : (
          <Button onClick={handleSignInClick} color="primary" startIcon={<PersonOutlineOutlined />} className="h-10 normal-case">
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
