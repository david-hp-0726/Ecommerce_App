import React, { useEffect } from "react";
import "./Checkout.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "../components/CheckoutProduct";
import Subtotal from "../components/Subtotal";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  const getItemsArray = () => {
    const items = [];
    for (let index = 0; index < basket.length; index++) {
      const item = basket[index];
      items.push(
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          itemIndex={index}
        />
      );
    }
    return items;
  };

  return (
    <div className="checkout checkout__minHeight">
      <div className="checkout__left">
        {basket?.length === 0 ? (
          <div>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            <p className="checkout__emptyReminder">
              You have nothing in your basket. Click "Add to Basket" to add
              items to basket!
            </p>
          </div>
        ) : (
          <div>
            <h2>Your Shopping Basket</h2>
            {getItemsArray()}
          </div>
        )}
      </div>
      <Subtotal />
    </div>
  );
}

export default Checkout;
