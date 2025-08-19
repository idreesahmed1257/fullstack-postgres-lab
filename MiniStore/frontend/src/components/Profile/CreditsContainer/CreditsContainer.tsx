import { useState } from "react";
import { Tab, Tabs, CircularProgress, Stack } from "@mui/material";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
import styles from "../GiftsContainer/giftsContainer.module.scss";
import dayjs from "dayjs";
import { useReceivedCreditsQuery, useSentCreditsQuery } from "../../../hooks/useCredits";

const creditReceiveColumns: Column[] = [
  { key: "sender.name", label: "Sender Name" },
  { key: "sender.email", label: "Sender Email" },
  { key: "createdAt", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "amount", label: "Total", render: (val) => `$${val}` },
];

const creditSentColumns: Column[] = [
  { key: "recipient.name", label: "Recipient Name" },
  { key: "recipient.email", label: "Recipient Email" },
  { key: "createdAt", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "amount", label: "Total", render: (val) => `$${val}` },
];

const CreditsContainer = () => {
  const [tab, setTab] = useState(0);

  const { data: sentCredits = [], isLoading: loadingSent } = useSentCreditsQuery();
  const { data: receivedCredits = [], isLoading: loadingReceived } = useReceivedCreditsQuery();

  return (
    <div className={styles.giftsContainer}>
      <div className={styles.tabsWrapper}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered TabIndicatorProps={{ style: { display: "none" } }} className={styles.tabs}>
          <Tab label="Sent" className={`${styles.tab} ${tab === 0 ? styles.activeTab : ""}`} />
          <Tab label="Received" className={`${styles.tab} ${tab === 1 ? styles.activeTab : ""}`} />
        </Tabs>
      </div>

      {tab === 0 && (
        <>
          <h3>Recent Credits Sent</h3>
          {loadingSent ? (
            <Stack sx={{ display: "flex", height: "20vh", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Stack>
          ) : (
            <ProfileTable columns={creditSentColumns} data={sentCredits} />
          )}
        </>
      )}

      {tab === 1 && (
        <>
          <h3>Recent Credits Received</h3>
          {loadingReceived ? (
            <Stack sx={{ display: "flex", height: "20vh", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Stack>
          ) : (
            <ProfileTable columns={creditReceiveColumns} data={receivedCredits} />
          )}
        </>
      )}
    </div>
  );
};

export default CreditsContainer;
