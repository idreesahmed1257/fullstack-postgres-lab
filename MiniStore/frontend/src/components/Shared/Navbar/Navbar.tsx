import { PersonOutlineOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Button, IconButton, useTheme } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "../../../assets/LoginIcon";
import ProfileCard from "../ProfileCard/ProfileCard";
import styles from "./navbar.module.scss";
import { useAuthStore, useProductStore } from "../../../stores";

const Navbar = () => {
  const theme = useTheme();
  const { isAuth } = useAuthStore();
  const { cartItems } = useProductStore();

  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!isAuth) {
      toast.error("Please Login to Checkout");
      return;
    }
    navigate("/cart");
  };

  return (
    <div className={styles.navbar}>
      <Link to={"/"} className={styles.logoContainer}>
        <LoginIcon />
        <p>Giftly</p>
      </Link>

      <div className={styles.right}>
        <Badge badgeContent={cartItems?.length} color="primary">
          <IconButton
            onClick={handleCartClick}
            className={styles.iconBtn}
            style={{
              backgroundColor: cartItems?.length ? theme.palette.primary.main : theme.palette.background.default,
            }}
          >
            <ShoppingCartOutlined
              style={{
                color: cartItems?.length ? theme.palette.background.default : theme.palette.primary.main,
              }}
            />
          </IconButton>
        </Badge>

        {isAuth ? (
          <ProfileCard />
        ) : (
          <Button className={styles.signinBtn} onClick={handleSignInClick} color="primary" startIcon={<PersonOutlineOutlined />}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
