import React from "react";
import "./SideDrawer.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import LoginNav from "../login/Login";

function SideDrawer({ setLoginToggle, hideLogin }) {
  const show = useSelector((state) => state.condition.show);

  const sideDrawerClass = ["sidedrawer"];

  if (show === "show") sideDrawerClass.push("show");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () =>
    cartItems.reduce((qty, item) => qty + Number(item.qty), 0);

  return (
    <div className={sideDrawerClass.join(" ")}>
      <div className="mobile-login">
        <LoginNav setLoginToggle={setLoginToggle} hideLogin={hideLogin} />
      </div>
      <ul className="sidedrawer__links">
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideDrawer;
