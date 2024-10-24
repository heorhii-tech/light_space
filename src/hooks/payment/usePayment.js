import { React, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { functions } from "../../firebaseConfig";
import { httpsCallable } from "firebase/functions";

export const usePayment = () => {
  const [hours, setHours] = useState(null);
  const [amount, setAmount] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51Q7EXM08cnbHQ8RO5IW5ZgCqAojDbjwZguiU0Tssdkjsux2y0Q8UvSwZE8unFYwseY1bPPIRGmxBoavOPvsZEIeJ000W8kVVuI"
  );

  const handlePayment = async (amount, table) => {
    setIsPaymentLoading(true);
    const stripe = await stripePromise;

    // Call the createStripeCheckoutSession cloud function
    const createCheckoutSession = httpsCallable(
      functions,
      "createStripeCheckoutSession"
    );

    try {
      const response = await createCheckoutSession({
        amount,
        productName: table.tableID,
      });
      const sessionId = response.data.id;
      if (sessionId) {
        setIsPaymentLoading(false);
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        setIsPaymentLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setIsPaymentLoading(false);
    }
  };
  const calculateHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 0; // Если даты не заданы
    const millisecondsInHour = 1000 * 60 * 60; // Количество миллисекунд в часе
    const timeDifference = endDate.getTime() - startDate.getTime(); // Разница во времени в миллисекундах
    const hours = timeDifference / millisecondsInHour; // Перевод в часы
    return hours.toFixed(2);
  };
  const calculateAmount = (hours, price) => {
    if (!hours || !price) return 0;
    const amount = hours * price;
    return parseFloat(amount.toFixed(2));
  };

  return {
    calculateHours,
    setHours,
    hours,
    calculateAmount,
    setAmount,
    amount,
    handlePayment,
    isPaymentLoading,
  };
};
