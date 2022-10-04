import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { CARD_OPTIONS } from "./PaymentFormStyles";

export default function PaymentForm({ name, getCartSubTitle }) {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.condition.success);
  const notPayed = useSelector((state) => state.condition.payed);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post("http://localhost:3000/payment", {
          amount: getCartSubTitle * 100,
          id,
          name: name,
        });

        if (res.data.success) {
          dispatch({ type: "SUCCESS_PAYMENT", payload: "open" });
          dispatch({ type: "SUCCESS_PAYMENT_MESSAGE", payload: "payed" });
          localStorage.clear();
          window.location.reload(false);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {success === "open" ? (
        <div className="payment-wrapper">
          <div
            onClick={() => {
              dispatch({ type: "SUCCESS_PAYMENT", payload: "close" });
            }}
            className="close-payment-cart"
          >
            x
          </div>
          {notPayed !== "payed" ? (
            <div className="payment-card">
              <form onSubmit={handleSubmitPayment}>
                <fieldset className="form-group">
                  <div className="form-row">
                    <CardElement options={CARD_OPTIONS} />
                  </div>
                </fieldset>
                <button className="pay-btn">Pay</button>
              </form>
            </div>
          ) : (
            <div className="payment-card">
              <h2>Your payment is success</h2>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
