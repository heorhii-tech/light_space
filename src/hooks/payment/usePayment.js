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

  const [reservationSuccessPaid, setReservationsSuccessPaid] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51Q7EXM08cnbHQ8RO5IW5ZgCqAojDbjwZguiU0Tssdkjsux2y0Q8UvSwZE8unFYwseY1bPPIRGmxBoavOPvsZEIeJ000W8kVVuI"
  );
  const db = getFirestore();

  const handlePayOnline = async (reservations) => {
    setPaymentLoading(true);
    const stripe = await stripePromise;

    //Call the createStripeCheckoutSession cloud function
    const createCheckoutSession = httpsCallable(
      functions,
      "createStripeCheckoutSession"
    );

    try {
      let reservationsID = [];
      reservations.forEach((reservation) => {
        reservationsID.push(reservation.reservationID);
      });

      const response = await createCheckoutSession({
        amount: totalAmount,
        productName: `Reservation`,
        reservations: JSON.stringify(reservationsID),
      });
      const sessionId = response.data.id;
      if (sessionId) {
        setPaymentLoading(false);
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        setPaymentLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setPaymentLoading(false);
    }
  };
  // pay by cash later. set in DB payment method : cash
  const handlePayByCash = async (reservations) => {
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
  const paymentMethods = {
    payOnline: handlePayOnline,
    payByCash: handlePayByCash,
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
      let totalAmount = 0;
      unApprovedReservations.forEach((reservation) => {
        totalAmount += reservation.price;
      });
      setTotalAmount(totalAmount);
    }
  }, [unApprovedReservations]);

  // use effect for close  showing in Cart success result after payment
  useEffect(() => {
    if (reservationSuccessPaid) {
      const timer = setTimeout(() => {
        setReservationsSuccessPaid(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reservationSuccessPaid]);

  return {
    calculateHours,
    setCurrentReservationHours,
    currentReservationHours,
    calculateAmount,
    setCurrentreservatinAmount,
    currentReservationAmount,

    totalAmount,
    paymentMethods,
    reservationSuccessPaid,
    paymentLoading,
    setPaymentLoading,
    setReservationsSuccessPaid,
  };
};
