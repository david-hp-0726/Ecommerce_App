import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Product({ id, title, image, price, rating }) {
  const [{ user, basket }, dispatch] = useStateValue();
  const basketCollectionRef = collection(db, "basket");
  const basketRef = doc(basketCollectionRef, user ? user.uid : "20040726");

  const addToBasket = () => {
    const updatedBasketItems = [
      {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
      ...basket,
    ];

    try {
      updateDoc(basketRef, { items: updatedBasketItems });
      dispatch({
        type: "SET_BASKET",
        basket: updatedBasketItems,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="product image" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
