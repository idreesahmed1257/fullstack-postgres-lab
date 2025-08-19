import { Avatar, Typography, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { AccountBalanceWalletOutlined, Logout, Person } from "@mui/icons-material";
import styles from "./profileCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutService } from "../../../services/auth.service";
import { useAuthStore } from "../../../stores";
import { useUserQuery } from "../../../hooks/useAuthQueries";

const ProfileCard = () => {
  const { user, walletBalance, logout, updateWalletAmount } = useAuthStore();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickProfileCard = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    navigate("profile");
    handleClose();
  };

  const handleLogout = () => {
    logoutService();
    logout();
    handleClose();
  };

  const { data: userData } = useUserQuery();

  useEffect(() => {
    if (userData?.walletBalance !== undefined && userData?.walletBalance !== null) {
      updateWalletAmount(userData.walletBalance);
    }
  }, [userData, updateWalletAmount]);

  return (
    <>
      <div onClick={handleClickProfileCard} className={styles.profileCard}>
        <Tooltip title={user?.name}>
          <Avatar className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</Avatar>
        </Tooltip>
        <div className={styles.userInfo}>
          <p className={styles.name}>{user?.name}</p>
          <div className={styles.wallet}>
            <AccountBalanceWalletOutlined fontSize="small" />
            <Typography variant="body2" className={styles.balance}>
              ${walletBalance?.toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 2,
          sx: { minWidth: 160 },
        }}
      >
        <MenuItem onClick={handleViewProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileCard;
