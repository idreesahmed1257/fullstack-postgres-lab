import { useState } from "react";
import { Tab, Tabs, CircularProgress, Stack } from "@mui/material";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
import dayjs from "dayjs";
import { useReceivedGiftsQuery, useSentGiftsQuery } from "../../../hooks/useGifts";

const giftReceiveColumns: Column[] = [
  { key: "sender.name", label: "Sender Name" },
  { key: "sender.email", label: "Sender Email" },
  {
    key: "products",
    label: "Products",
    render: (val) =>
      val?.map((prod: any, index: number) => {
        const isLast = index === val.length - 1;
        return (
          <div key={index} className="flex flex-col gap-1">
            <strong>{prod.title}</strong>
            {!isLast && <hr className="border-t border-gray-200" />}
          </div>
        );
      }),
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
    render: (val) =>
      val?.map((prod: any, index: number) => {
        const isLast = index === val.length - 1;
        return (
          <div key={index} className="flex flex-col gap-1">
            <strong>{prod.title}</strong>
            {!isLast && <hr className="border-t border-gray-200" />}
          </div>
        );
      }),
  },
  { key: "giftedAt", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "totalAmount", label: "Total", render: (val) => `$${val}` },
];

const GiftsContainer = () => {
  const [tab, setTab] = useState(0);
  const { data: sentGifts = [], isLoading: loadingSent } = useSentGiftsQuery();
  const { data: receivedGifts = [], isLoading: loadingReceived } = useReceivedGiftsQuery();

  return (
    <div className="p-4 rounded-lg bg-bg-main">
      <div className="flex justify-center p-1 mb-4 rounded-md bg-bg-paper">
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered TabIndicatorProps={{ style: { display: "none" } }}>
          <Tab label="Sent" className={`text-sm  font-medium rounded px-3 py-1 min-h-[28px] ${tab === 0 ? "bg-primary text-bg-main font-semibold" : "text-text-dark hover:bg-primary/40"}`} />
          <Tab label="Received" className={`text-sm font-medium rounded px-3 py-1 min-h-[28px] ${tab === 1 ? "bg-primary text-bg-main font-semibold" : "text-text-dark hover:bg-primary/40"}`} />
        </Tabs>
      </div>

      {tab === 0 && (
        <>
          <h3 className="mb-2 font-bold text-primary">Recent Gifts Sent</h3>
          {loadingSent ? (
            <Stack className="flex items-center justify-center h-52">
              <CircularProgress />
            </Stack>
          ) : (
            <ProfileTable columns={giftSentColumns} data={sentGifts} />
          )}
        </>
      )}

      {tab === 1 && (
        <>
          <h3 className="mb-2 font-bold text-primary">Recent Gifts Received</h3>
          {loadingReceived ? (
            <Stack className="flex items-center justify-center h-52">
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
