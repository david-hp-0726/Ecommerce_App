import React from 'react'
import { useStateValue } from './StateProvider';

function SearchResultProduct({item}) {
    const [{}, dispatch] = useStateValue();
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
        <button
          onClick={() => {
            dispatch({
              type: "ADD_TO_BASKET",
              item: item,
            });
          }}
        >
          Add to Basket
        </button>
      </div>
    );
}

export default SearchResultProduct
