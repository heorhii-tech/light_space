import React from "react";
import useReservation from "../../hooks/useReservation";

function CurrentUserReservation({
  currentUserReservation,
  className,
  setReloadCurrentUserReservations,
}) {
  const { handleDeletCurrentReservation } = useReservation();
  return (
    <div className={className}>
      {currentUserReservation.length ? (
        currentUserReservation.map((item, index) => {
          return (
            <div className="reservation" key={index}>
              <p>Table: {item.tableID}</p>
              <p>Start time: {item.startTime}</p>
              <p>End time:{item.endTime}</p>
              <p>{item.reservationID}</p>
              <button
                onClick={() => {
                  handleDeletCurrentReservation(item.reservationID);
                  setReloadCurrentUserReservations(true);
                }}
              >
                CANCEL
              </button>
            </div>
          );
        })
      ) : (
        <p>You dont have current reservations</p>
      )}
    </div>
  );
}

export default CurrentUserReservation;
