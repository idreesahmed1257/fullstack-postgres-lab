import { CircularProgress, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useUserOrdersQuery } from "../../../hooks/useOrders";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";

const orderColumns: Column[] = [
  { key: "id", label: "Order No." },
  {
    key: "products",
    label: "Products",
    render: (val) => (
      <>
        {val.map((prod: any, index: number) => {
          const isLast = index === val.length - 1;
          return (
            <div key={index} className="flex flex-col gap-1">
              <strong>{prod.title}</strong>
              {!isLast && <hr className="border-t border-gray-200" />}
            </div>
          );
        })}
      </>
    ),
  },
  { key: "created_at", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "total_amount", label: "Total", render: (val) => `$${val.toFixed(2)}` },
];

const OrderContainer = () => {
  const { data: orders = [], isLoading } = useUserOrdersQuery();

  return (
    <>
      <h3 className="mb-4">Recent Orders</h3>
      {isLoading ? (
        <Stack sx={{ display: "flex", height: "20vh", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Stack>
      ) : (
        <ProfileTable columns={orderColumns} data={orders} />
      )}
    </>
  );
};

export default OrderContainer;
