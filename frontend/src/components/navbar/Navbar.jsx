import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginNav from "../login/Login";

function Navbar({ click, setLoginToggle, hideLogin }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () =>
    cartItems.reduce((qty, item) => qty + Number(item.qty), 0);

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <h2>MERN Shopping</h2>
        </Link>
      </div>
      <ul className="navbar__links">
        <li>
          <LoginNav setLoginToggle={setLoginToggle} hideLogin={hideLogin} />
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            Cart
            <span className="cart-logo__badge">{getCartCount()}</span>
          </Link>
        </li>
        <li className="shop-link">
          <Link to="/">Shop</Link>
        </li>
      </ul>
      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Navbar;
