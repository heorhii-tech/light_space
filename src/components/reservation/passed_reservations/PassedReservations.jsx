import React from "react";
import PassedReservation from "./PassedReservation";
import { Empty } from "antd";

function PassedReservations({ passedUserReservations, title }) {
  return passedUserReservations.length > 0 ? (
    <div className="current_reservation_wrapper">
      {passedUserReservations.map((reservation) => {
        <div className="reservation" key={reservation.reservationID}>
          <PassedReservation reservation={reservation} />
        </div>;
      })}
    </div>
  ) : (
    <Empty />
  );
}
export default PassedReservations;
