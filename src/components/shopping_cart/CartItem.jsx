import React from "react";
import { Alert, Button } from "antd";
const CartItem = ({ reservation, handleDeleteCurrentReservation }) => {
  return (
    <Alert
      s
      message={`Table: ${reservation.tableID}`}
      description={
        <div>
          <h4>From: {reservation.startTime} </h4>
          <h4>To: {reservation.endTime}</h4>
          <h4>Price: {reservation.price} €</h4>
        </div>
      }
      type="success"
      action={
        <Button
          size="small"
          danger
          ghost
          onClick={() =>
            handleDeleteCurrentReservation(reservation.reservationID)
          }
        >
          Delete
        </Button>
      }
    />
  );
};

export default CartItem;
