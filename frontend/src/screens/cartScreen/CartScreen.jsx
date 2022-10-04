import React from "react";
import "./CartScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Components

import CartItem from "../../components/cartItem/CartItem";
import PaymentForm from "../../components/paymentForm/PaymentForm";

// Actions
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const PUBLIC_KEY =
  "pk_test_51HMRlbLhFvFS5u9y0Bxupphwiw8FIHbhgyR9WE68WFWZvOSmLX6iCd6qoOaKYK6uGIMqO5nTBjWMGJT4S6DVbNam0059LR2fNF";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTitle = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  const success = useSelector((state) => state.condition.success);

  return (
    <>
      <h2 className="main-cart-title">Shopping Cart</h2>
      <div className="cart-screen">
        {cartItems.length === 0 ? (
          ""
        ) : success === "open" ? (
          <div className="payment-background"></div>
        ) : (
          ""
        )}
        <div className="cart-screen__left">
          {cartItems.length === 0 ? (
            <div>
              Your cart is empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <Elements key={Math.random() * 2} stripe={stripeTestPromise}>
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeHandler}
                />
                <PaymentForm
                  getCartSubTitle={getCartSubTitle(cartItems)}
                  id={item.id}
                  name={item.name}
                />
              </Elements>
            ))
          )}
        </div>
        <div className="cart-screen__right">
          <div className="cart-screen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTitle().toFixed(2)}</p>
          </div>
          <div>
            <button
              onClick={() => {
                dispatch({ type: "SUCCESS_PAYMENT", payload: "open" });
              }}
              className="btn-checkout"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartScreen;
