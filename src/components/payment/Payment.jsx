import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React from "react";

export function PaymentForm({ totalCost }) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Создание платежа
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Здесь вы можете отправить данные на сервер для дальнейшей обработки
      // Например, создание платежа на вашем сервере
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Оплатить {totalCost} EUR
      </button>
    </form>
  );
}
