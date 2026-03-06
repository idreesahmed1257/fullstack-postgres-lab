import { useState } from "react";
import { Tab, Tabs, CircularProgress, Stack } from "@mui/material";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
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
    <div className="p-4 rounded-lg bg-bg-main">
      <div className="flex justify-center p-1 mb-4 rounded-md bg-bg-paper">
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered TabIndicatorProps={{ style: { display: "none" } }}>
          <Tab label="Sent" className={`text-sm font-medium rounded px-3 py-1 min-h-[28px] ${tab === 0 ? "bg-primary text-bg-main font-semibold" : "text-text-dark hover:bg-primary/40"}`} />
          <Tab label="Received" className={`text-sm font-medium rounded px-3 py-1 min-h-[28px] ${tab === 1 ? "bg-primary text-bg-main font-semibold" : "text-text-dark hover:bg-primary/40"}`} />
        </Tabs>
      </div>

      {tab === 0 && (
        <>
          <h3 className="mb-2 font-bold text-primary">Recent Credits Sent</h3>
          {loadingSent ? (
            <Stack className="flex items-center justify-center h-52">
              <CircularProgress />
            </Stack>
          ) : (
            <ProfileTable columns={creditSentColumns} data={sentCredits} />
          )}
        </>
      )}

      {tab === 1 && (
        <>
          <h3 className="mb-2 font-bold text-primary">Recent Credits Received</h3>
          {loadingReceived ? (
            <Stack className="flex items-center justify-center h-52">
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
