import React from "react";

function SingleOrder({ order }) {
  console.log(order);
  return (
    <div className="orders__singleOrder">
      <div className="orders__orderInfo">
        <div>ORDER PLACED</div>
        <div>TOTAL</div>
        <div>SHIP TO</div>
        <div>{order.date}</div>
        <div>${order.total.toFixed(2)}</div>
        <div>{order.user}</div>
      </div>
      <div className="orders__orderItems">
        <h3>Items will never be delivered</h3>
        {order.items.map((item) => {
          return (
            <div className="orders__itemContainer">
              <div className="orders__imageContainer">
                <img
                  src={item.image}
                  alt="Item Image"
                  className="orders__itemImage"
                />
              </div>
              <div className="orders__itemInfo">
                <div className="orders__itemTitle">{item.title}</div>
                <strong>${item.price}</strong>
              </div>
              <div className="orders__buttons">
                <button className="orders__supportButton">
                  Get product support
                </button>
                <button className="orders__reviewButton">
                  Write a product review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SingleOrder;
