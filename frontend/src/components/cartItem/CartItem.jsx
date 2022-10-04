import React from "react";
import "./CartItem.scss";

import { Link } from "react-router-dom";

function CartItem({ item, qtyChangeHandler, removeHandler }) {
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="cart-item__name">
        <p>{item.name}</p>
      </Link>
      <p className="cart-item__price">${item.price}</p>
      <select
        className="cart-item__select"
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cart-item__deleteBtn"
        onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default CartItem;
