import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";

// Инициализация Stripe
const stripePromise = loadStripe(
  "pk_test_51Q7EXM08cnbHQ8RO5IW5ZgCqAojDbjwZguiU0Tssdkjsux2y0Q8UvSwZE8unFYwseY1bPPIRGmxBoavOPvsZEIeJ000W8kVVuI"
); // Вставь свой publishable key

const CheckoutButton = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleClick = async () => {
    const response = await fetch("/createCheckoutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount, currency: "usd" }), // Укажи сумму и валюту
    });

    const session = await response.json();

    // Редирект на Stripe для оплаты
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Error redirecting to Stripe:", error);
    }
  };

  return (
    <button onClick={handleClick} disabled={!stripe}>
      Оплатить {amount / 100} USD
    </button>
  );
};

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutButton amount={1000} /> {/* Пример суммы: 1000 = 10.00 USD */}
    </Elements>
  );
}
