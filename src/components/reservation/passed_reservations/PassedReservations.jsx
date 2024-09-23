import React from "react";
import PassedReservation from "./PassedReservation";
import { Empty } from "antd";

function PassedReservations({ passedUserReservations, title }) {
  return (
    <div className="current_resrvation_wrapper">
      {passedUserReservations.length ? (
        passedUserReservations.map((reservation) => (
          <div className="reservation" key={reservation.reservationID}>
            <PassedReservation reservation={reservation} />
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default PassedReservations;
