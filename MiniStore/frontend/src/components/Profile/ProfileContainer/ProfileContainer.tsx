import { Divider, Tab, Tabs } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import CreditsContainer from "../CreditsContainer/CreditsContainer";
import GiftsContainer from "../GiftsContainer/GiftsContainer";
import OrderContainer from "../OrdersContainer/OrderContainer";
import WalletCard from "../WalletCard/WalletCard";
import { useAuthStore } from "../../../stores";

const ProfileContainer = () => {
  const [tab, setTab] = useState(0);

  const { user, walletBalance } = useAuthStore();

  return (
    <div className="p-8 bg-bg-main">
      {/* Profile Header */}
      <div className="flex gap-5">
        <div className="flex flex-col items-center w-full p-4 mb-8 text-center border bg-bg-paper rounded-xl border-primary">
          <img src={`https://robohash.org/${user?.email}.png`} alt="Profile" className="w-[100px] h-[100px] rounded-full mb-3 border-[3px] border-primary" />
          <h2 className="m-0 capitalize text-text-dark">{user?.name}</h2>
          <p className="text-text-dark opacity-80 my-[2px]">{user?.email}</p>
          {user?.createdAt && <p className="text-text-dark opacity-80 my-[2px]">Joined {dayjs(user.createdAt).format("MMMM D, YYYY")}</p>}
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
        <div className="mb-8">
          <OrderContainer />
        </div>
      )}

      {/* Gifts Tab */}
      {tab === 1 && (
        <div className="mb-8">
          <GiftsContainer />
        </div>
      )}

      {/* Credits Tab */}
      {tab === 2 && (
        <div className="mb-8">
          <CreditsContainer />
        </div>
      )}
    </div>
  );
};

export default ProfileContainer;
