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
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        {basket?.length === 0 ? (
          <div>
            <h2 className="checkout__emptyReminder">Your Shopping Basket</h2>
            <p>
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
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
