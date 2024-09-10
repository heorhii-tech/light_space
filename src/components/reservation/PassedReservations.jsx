import React from "react";

function PassedReservations({ passedUserReservations, title }) {
  return (
    <div className="current_resrvation_wrapper">
      {passedUserReservations.length ? (
        passedUserReservations.map((reservation) => {
          return (
            <div className="reservation" key={reservation.reservationID}>
              <h3>{reservation.tableID}</h3>
              <h5>{reservation.startTime}</h5>
              <h5>{reservation.endTime}</h5>
            </div>
          );
        })
      ) : (
        <p>{title}</p>
      )}
    </div>
  );
}

export default PassedReservations;
