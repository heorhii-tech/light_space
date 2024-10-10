import { loadStripe } from "@stripe/stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import React from "react";

function PaymentPage(props) {
  const stripePromise = loadStripe(
    "pk_test_51Q7EXM08cnbHQ8RO5IW5ZgCqAojDbjwZguiU0Tssdkjsux2y0Q8UvSwZE8unFYwseY1bPPIRGmxBoavOPvsZEIeJ000W8kVVuI"
  ); // Публичный ключ Stripe

  const handleCheckout = async () => {
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 5000, // сумма в центах
        productName: "Test Product",
      }),
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url; // Перенаправление на страницу оплаты Stripe
      }
    });
  };

  // Например, кнопка для вызова функции
  return (
    <button
      style={{ border: "2px solid red", fontSize: 32 }}
      onClick={handleCheckout}
    >
      Оплатить
    </button>
  );
}

export default PaymentPage;
