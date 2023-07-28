import React from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { getBasketTotal } from "./reducer";

function Checkout() {
  const [{ basket }] = useStateValue();
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
            <h2 className="checkout__emptyReminder">
              Your Shopping Basket is empty
            </h2>
            <p>
              You have nothing in your basket. Click "Add to Basket" to add
              items to basket!
            </p>
          </div>
        ) : (
          <div>
            <h2>Your Shopping Basket</h2>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
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
