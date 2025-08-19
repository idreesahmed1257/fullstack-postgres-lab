import { Divider, Tab, Tabs } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import CreditsContainer from "../CreditsContainer/CreditsContainer";
import GiftsContainer from "../GiftsContainer/GiftsContainer";
import OrderContainer from "../OrdersContainer/OrderContainer";
import WalletCard from "../WalletCard/WalletCard";
import styles from "./profileContainer.module.scss";
import { useAuthStore } from "../../../stores";

const ProfileContainer = () => {
  const [tab, setTab] = useState(0);

  const { user, walletBalance } = useAuthStore();

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHead}>
        <div className={styles.header}>
          <img src={`https://robohash.org/${user?.email}.png`} alt="Profile" className={styles.avatar} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.createdAt && <p>Joined {dayjs(user.createdAt).format("MMMM D, YYYY")}</p>}</p>
        </div>

        <WalletCard balance={walletBalance} />
      </div>
      <br />
      <Divider />
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
        <Tab label="Orders" />
        <Tab label="Gifts" />
        <Tab label="Credits" />
      </Tabs>

      {tab === 0 && (
        <div className={styles.section}>
          <OrderContainer />
        </div>
      )}

      {/* Gifts Tab */}
      {tab === 1 && (
        <div className={styles.section}>
          <GiftsContainer />
        </div>
      )}

      {/* Credits Tab */}
      {tab === 2 && (
        <div className={styles.section}>
          <CreditsContainer />
        </div>
      )}
    </div>
  );
};

export default ProfileContainer;
