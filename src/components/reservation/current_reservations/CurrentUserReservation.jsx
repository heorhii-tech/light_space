import React from "react";

function CurrentUserReservation({ reservation }) {
  return (
    <>
      <h3>Table: {reservation.tableID}</h3>
      <h5>From: {reservation.startTime}</h5>
      <h5>To: {reservation.endTime}</h5>
      <h5>Payment method: {reservation.paymentMethod}</h5>
      <h5>Total amount: {reservation.price} €</h5>
      <h5>Paid: {reservation.paid ? "Yes" : "Please pay on the desk"}</h5>
    </>
  );
}

export default CurrentUserReservation;
