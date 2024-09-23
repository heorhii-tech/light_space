import React from "react";
import ButtonUniversal from "../../common/buttons/ButtonUniversal";
import CurrentUserReservation from "./CurrentUserReservation";
import EmptyData from "../../common/ant-design_components/EmptyData";
import Description from "../../common/texts/Description";

function CurrentUserReservations({
  currentUserReservations,
  handleDeleteCurrentReservation,
  title,
}) {
  return (
    <>
      {currentUserReservations.length ? (
        <div className="current_resrvation_wrapper">
          {currentUserReservations.map((reservation) => (
            <div className="reservation" key={reservation.reservationID}>
              <CurrentUserReservation
                reservation={reservation}
                handleDeleteCurrentReservation={handleDeleteCurrentReservation}
              />
              <ButtonUniversal
                className="primary-button button"
                title="CANCEL"
                func={() =>
                  handleDeleteCurrentReservation(reservation.reservationID)
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyData />
      )}
    </>
  );
}

export default CurrentUserReservations;
