import React from "react";
import "./Subtotal.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer.js";

function Subtotal() {
  const [{ basket, user, nextOrderId }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const basketTotal = getBasketTotal(basket);
  const checkout = () => {
    if (basket.length === 0) {
      return;
    }
    const dateArray = new Date()
      .toLocaleString("en-US", { dateStyle: "full" })
      .split(" ");
    const date = dateArray[1] + " " + dateArray[2] + " " + dateArray[3];
    const order = {
      id: nextOrderId.slice(),
      user: user.slice(),
      date: date,
      total: getBasketTotal(basket),
      items: [...basket],
    };
    let newNextOrderId = String.valueOf(nextOrderId) + 1 + "";
    dispatch({
      type: "CREATE_ORDER",
      order: order,
      nextOrderId: newNextOrderId,
    });
    dispatch({
      type: "CLEAR_BASKET",
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
