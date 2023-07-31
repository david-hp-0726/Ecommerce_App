import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../StateProvider";
import { doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  hideButton,
  itemIndex,
}) {
  const [{ user, basket }, dispatch] = useStateValue();
  const basketCollectionRef = collection(db, "basket");
  const basketRef = doc(basketCollectionRef, user ? user.uid : "20040726");

  const removeFromBasket = () => {
    try {
      const updatedBasketItems = [...basket];
      updatedBasketItems.splice(itemIndex, 1);
      updateDoc(basketRef, { items: updatedBasketItems });
      dispatch({
        type: "SET_BASKET",
        basket: updatedBasketItems,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checkoutProduct">
      <hr></hr>
      <div className="checkout">
        <img className="checkoutProduct__image" src={image} />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
