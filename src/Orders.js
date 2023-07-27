import React from "react";
import { useStateValue } from "./StateProvider";
import SingleOrder from "./SingleOrder";
import "./Orders.css";

function Orders() {
  const [{ orders }] = useStateValue();
  
  return (
    <div className="orders">
      <h2>Your Orders</h2>
      <div className="orders_container">
        {orders.map((order) => (
          <SingleOrder order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
