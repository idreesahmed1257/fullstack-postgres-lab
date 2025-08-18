import React, { useEffect, useState } from "react";
import ProfileTable, { Column } from "../ProfileTable/ProfileTable";
import styles from "../ProfileContainer/profileContainer.module.scss";
import dayjs from "dayjs";
import { getUserOrderService } from "../../../services/order.service";

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
            <div key={index} className={styles.productTableItem}>
              <strong>{prod.title}</strong>
              {!isLast && <hr />}
            </div>
          );
        })}
      </>
    ),
  },
  { key: "createdAt", label: "Date & Time", render: (val) => `${dayjs(val).format("DD MMM YYYY | hh:mm A")}` },
  { key: "total_amount", label: "Total", render: (val) => `$${val.toFixed(2)}` },
];

const OrderContainer = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await getUserOrderService();
      setOrders(response?.data?.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <>
      <h3>Recent Orders</h3>
      <ProfileTable columns={orderColumns} data={orders} />
    </>
  );
};

export default OrderContainer;
