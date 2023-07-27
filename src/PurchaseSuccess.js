import React from "react";
import "./PurchaseSuccess.css";
import { useStateValue } from "./StateProvider";
import { Link } from 'react-router-dom';

function PurchaseSuccess() {
  const [{ user }] = useStateValue();

  return (
    <div className="purchaseSuccess">
      <h1>Purchase Success</h1>

      <h2 className="purchaseSuccess__hello">Hello {user}, </h2>
      <div>
        Thank you for shopping with us. We'd like to let you know that Amazon
        has received your order and is preparing it for shipment. Your estimated
        delivery date is below. If you would like to view the status of your
        order or make any changes to it, please visit{" "}
        <Link to="/orders">Your Orders</Link> on Amazon.com
      </div>
      <div className="purchaseSuccess__infoContainer">
        <div className="purchaseSuccess__infoItem">
          <div className="purchaseSuccess__infoLineOne">
            Your estimated delivery date is:
          </div>
          <div className="purchaseSuccess__infoLineTwo">July 26, 2004</div>
        </div>
        <div className="purchaseSuccess__infoItem">
          <div className="purchaseSuccess__infoLineOne">
            Your order will be sent to:
          </div>
          <div className="purchaseSuccess__infoLineTwo">David's House</div>
        </div>
        <div className="purchaseSuccess__infoItem">
          <div className="purchaseSuccess__infoLineOne">
            Your shipping speed:
          </div>
          <div className="purchaseSuccess__infoLineTwo">Standard Shipping</div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
