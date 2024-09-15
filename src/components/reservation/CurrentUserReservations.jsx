import React from "react";
import ButtonUniversal from "../common/buttons/ButtonUniversal";

function CurrentUserReservations({
  currentUserReservations,
  handleDeleteCurrentReservation,
  title,
}) {
  return (
    <div className="current_resrvation_wrapper">
      {currentUserReservations.length ? (
        currentUserReservations.map((reservation) => {
          return (
            <div className="reservation" key={reservation.reservationID}>
              <h3>{reservation.tableID}</h3>
              <h5>{reservation.startTime}</h5>
              <h5>{reservation.endTime}</h5>
              <ButtonUniversal
                title={`CANCEL`}
                func={() =>
                  handleDeleteCurrentReservation(reservation.reservationID)
                }
              />
            </div>
          );
        })
      ) : (
        <p>{title}</p>
      )}
    </div>
  );
}

export default CurrentUserReservations;
