import React from "react";
import "./Subtotal.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer.js";
import { doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

function Subtotal() {
  const [{ basket, user, orders }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const basketTotal = getBasketTotal(basket);
  const basketCollectionRef = collection(db, "basket");
  const basketRef = doc(basketCollectionRef, user ? user.uid : "20040726");
  const ordersCollectionRef = collection(db, "orders");
  const ordersRef = doc(ordersCollectionRef, user ? user.uid : "20040726");

  const getRandomId = () => {
    let randomId = "";
    for (let index = 0; index < 12; index++) {
      if (index != 0 && index % 4 == 0) {
        randomId += "-";
      }
      randomId += (Math.random() * 10).toFixed(0);
    }
    return randomId;
  };

  const getDateString = () => {
    return new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const checkout = () => {
    if (basket.length == 0 || !user) {
      return;
    }
    const dateString = getDateString();
    const randomId = getRandomId();
    const updatedAllOrders = [
      ...orders,
      {
        id: randomId,
        user: "xche653",
        date: dateString,
        total: getBasketTotal(basket),
        items: [...basket],
      },
    ];
    updateDoc(ordersRef, { allOrders: updatedAllOrders });
    updateDoc(basketRef, { items: [] });
    dispatch({
      type: "SET_LAST_ORDER_ID",
      lastOrderId: randomId,
    });
    navigate("/purchaseSuccess");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={basketTotal}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={checkout}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
