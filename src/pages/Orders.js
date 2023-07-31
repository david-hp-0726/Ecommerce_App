import React from "react";
import { useStateValue } from "../StateProvider";
import SingleOrder from "../components/SingleOrder";
import "./Orders.css";

function Orders() {
  const [{ orders }] = useStateValue();

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      <p>{orders.length === 0 ? "You currently have no orders" : ""}</p>
      <div className="orders_container">
        {orders.map((order) => (
          <SingleOrder order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
