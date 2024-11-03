import { React, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { functions } from "../../firebaseConfig";
import { httpsCallable } from "firebase/functions";
import {
  collection,
  doc,
  updateDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";

export const usePayment = (unApprovedReservations) => {
  const [currentReservationHours, setCurrentReservationHours] = useState(null);
  const [currentReservationAmount, setCurrentreservatinAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [reservationSuccessPaid, setReservationsSuccessPaid] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
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
  // pay by cash later. set in DB payment method : cash
  const handlePayByCash = async (reservations) => {
    const db = getFirestore();
    setPaymentLoading(true);
    try {
      reservations.map(async (reservation) => {
        const reservID = reservation.reservationID;
        const reservationRef = doc(collection(db, "reservations"), reservID);

        const reservationSnapshot = await getDoc(reservationRef);

        if (reservationSnapshot.exists()) {
          await updateDoc(reservationRef, {
            approved: true,
            paymentMethod: "Cash",
          });
          setPaymentLoading(false);
        } else {
          console.error("Reservation not found or user ID does not match.");
          setPaymentLoading(false);
        }
        setReservationsSuccessPaid(true);
      });
    } catch (error) {
      console.error("Error updating reservation: ", error);
      setPaymentLoading(false);
    }
  };

  const calculateAmount = (hours, price) => {
    if (!hours || !price) return 0;
    const amount = hours * price;
    return parseFloat(amount.toFixed(2));
  };
  function calculateHours(startSeconds, endSeconds) {
    const differenceSeconds = endSeconds - startSeconds;
    return differenceSeconds / (60 * 60); // convert seconds to hours
  }

  useEffect(() => {
    if (unApprovedReservations.length) {
      const totalAmount = unApprovedReservations.reduce((acc, reservation) => {
        let hours = calculateHours(
          reservation.timeStampStart.seconds,
          reservation.timeStampEnd.seconds
        );
        let price = calculateAmount(hours, reservation.price);

        return acc + parseFloat(price);
      }, 0);
      setTotalAmount(totalAmount);
    }
  }, [unApprovedReservations]);

  return {
    calculateHours,
    setCurrentReservationHours,
    currentReservationHours,
    calculateAmount,
    setCurrentreservatinAmount,
    currentReservationAmount,
    handlePayment,
    isPaymentLoading,
    totalAmount,
    handlePayByCash,
    reservationSuccessPaid,
    paymentLoading,
    setPaymentLoading,
    setReservationsSuccessPaid,
  };
};
