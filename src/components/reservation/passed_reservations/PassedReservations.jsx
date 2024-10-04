import React from "react";
import PassedReservation from "./PassedReservation";
import { Empty } from "antd";

function PassedReservations({ passedUserReservations, title }) {
  console.log(passedUserReservations);
  return passedUserReservations.length ? (
    <div className="current_resrvation_wrapper">
      {passedUserReservations.map((reservation) => {
        return (
          <div className="reservation" key={reservation.reservationID}>
            <PassedReservation reservation={reservation} />
          </div>
        );
      })}
    </div>
  ) : (
    <Empty />
  );
}
export default PassedReservations;
