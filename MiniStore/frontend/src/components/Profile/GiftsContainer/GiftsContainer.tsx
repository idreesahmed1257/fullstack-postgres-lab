import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
import styles from "./giftsContainer.module.scss";
import { getReceivedGiftsService, getSentGiftsService } from "../../../services/gift.service";
import dayjs from "dayjs";

const giftReceiveColumns: Column[] = [
  { key: "sender.name", label: "Sender Name" },
  { key: "sender.email", label: "Sender Email" },
  {
    key: "products",
    label: "Products",
    render: (val) => (
      <>
        {val &&
          val.map((prod: any, index: number) => {
            const isLast = index === val.length - 1;
            return (
              <div key={index} className={styles.productTableItem}>
                <strong>{prod.title}</strong>
                {!isLast && <hr />}
              </div>
            );
          })}
      </>
    ),
  },
  { key: "giftedAt", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "totalAmount", label: "Total", render: (val) => `$${val}` },
];

const giftSentColumns: Column[] = [
  { key: "recipient.name", label: "Recipient Name" },
  { key: "recipient.email", label: "Recipient Email" },
  {
    key: "products",
    label: "Products",
    render: (val) => (
      <>
        {val &&
          val.map((prod: any, index: number) => {
            const isLast = index === val.length - 1;
            return (
              <div key={index} className={styles.productTableItem}>
                <strong>{prod.title}</strong>
                {!isLast && <hr />}
              </div>
            );
          })}
      </>
    ),
  },
  { key: "giftedAt", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "totalAmount", label: "Total", render: (val) => `$${val}` },
];

const GiftsContainer = () => {
  const [tab, setTab] = useState(0);

  const [sentGifts, setSentGifts] = useState([]);
  const [receivedGifts, setReceivedGifts] = useState([]);

  const fetchGifts = async () => {
    try {
      const [sentRes, receivedRes] = await Promise.all([getSentGiftsService(), getReceivedGiftsService()]);

      setSentGifts(sentRes?.data?.data);
      setReceivedGifts(receivedRes?.data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchGifts();
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
          <h3>Recent Gifts Sent</h3>
          <ProfileTable columns={giftSentColumns} data={sentGifts} />
        </>
      )}

      {tab === 1 && (
        <>
          <h3>Recent Gifts Received</h3>
          <ProfileTable columns={giftReceiveColumns} data={receivedGifts} />
        </>
      )}
    </div>
  );
};

export default GiftsContainer;
