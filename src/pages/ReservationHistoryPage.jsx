import React from "react";
import CurrentUserReservations from "../components/reservation/CurrentUserReservations";
import useReservations from "../hooks/reservation/useReservations";
import PassedReservations from "../components/reservation/PassedReservations";

function ReservationHistoryPage(props) {
  const {
    currentUserReservations,
    handleDeleteCurrentReservation,
    passedUserReservations,
  } = useReservations();
  return (
    <div>
      <CurrentUserReservations
        currentUserReservations={currentUserReservations}
        handleDeleteCurrentReservation={handleDeleteCurrentReservation}
        title={`You dont have current reservations`}
      />
      <PassedReservations
        passedUserReservations={passedUserReservations}
        title={`You dont have passed reservations`}
      />
    </div>
  );
}

export default ReservationHistoryPage;
