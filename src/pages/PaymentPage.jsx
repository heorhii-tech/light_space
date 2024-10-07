import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "../components/payment/Payment";

function PaymentPage(props) {
  const stripePromise = loadStripe(
    "pk_test_51Q7EXM08cnbHQ8RO5IW5ZgCqAojDbjwZguiU0Tssdkjsux2y0Q8UvSwZE8unFYwseY1bPPIRGmxBoavOPvsZEIeJ000W8kVVuI"
  );
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm totalCost={5000} /> {/* Передаем стоимость */}
    </Elements>
  );
}

export default PaymentPage;
