import { useState } from "react";
import { Tab, Tabs, CircularProgress, Stack } from "@mui/material";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
import styles from "./giftsContainer.module.scss";
import dayjs from "dayjs";
import { useReceivedGiftsQuery, useSentGiftsQuery } from "../../../hooks/useGifts";

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

  const { data: sentGifts = [], isLoading: loadingSent } = useSentGiftsQuery();
  const { data: receivedGifts = [], isLoading: loadingReceived } = useReceivedGiftsQuery();

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
          {loadingSent ? (
            <Stack sx={{ display: "flex", height: "20vh", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Stack>
          ) : (
            <ProfileTable columns={giftSentColumns} data={sentGifts} />
          )}
        </>
      )}

      {tab === 1 && (
        <>
          <h3>Recent Gifts Received</h3>
          {loadingReceived ? (
            <Stack sx={{ display: "flex", height: "20vh", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Stack>
          ) : (
            <ProfileTable columns={giftReceiveColumns} data={receivedGifts} />
          )}
        </>
      )}
    </div>
  );
};

export default GiftsContainer;
