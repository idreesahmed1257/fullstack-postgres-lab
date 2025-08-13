import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
import styles from "../GiftsContainer/giftsContainer.module.scss";
import { getReceivedCreditsService, getSentCreditsService } from "../../../services/credit.service";
import dayjs from "dayjs";

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

  const [sentCredits, setSentCredits] = useState([]);
  const [receivedCredits, setReceivedCredits] = useState([]);

  const fetchCredits = async () => {
    try {
      const [sentRes, receivedRes] = await Promise.all([getSentCreditsService(), getReceivedCreditsService()]);

      setSentCredits(sentRes?.data?.data);
      setReceivedCredits(receivedRes?.data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

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
          <ProfileTable columns={creditSentColumns} data={sentCredits} />
        </>
      )}

      {tab === 1 && (
        <>
          <h3>Recent Credits Received</h3>
          <ProfileTable columns={creditReceiveColumns} data={receivedCredits} />
        </>
      )}
    </div>
  );
};

export default CreditsContainer;
