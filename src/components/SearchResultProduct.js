import React from "react";
import { useStateValue } from "../StateProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function SearchResultProduct({ item }) {
  const [{ user, basket }, dispatch] = useStateValue();
  const basketRef = doc(db, "basket", user ? user.uid : "20040726");

  const addToBasket = () => {
    const updatedBasketItems = [
      {
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        rating: item.rating,
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
    <div className="searchResult__itemContainer">
      <img
        src={item.image}
        alt="Product Image"
        className="searchResult__itemImage"
      />
      <div className="searchResult__itemInfo">
        <div className="searchResult__itemTitle">{item.title}</div>
        <div className="searchResult__itemPrice">
          <small>$</small>
          <strong>{item.price}</strong>
        </div>
        <div className="searchResult__itemRating">
          {Array(item.rating)
            .fill()
            .map((_, i) => {
              return <p>🌟</p>;
            })}
        </div>
      </div>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default SearchResultProduct;
