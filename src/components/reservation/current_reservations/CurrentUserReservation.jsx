import React from "react";
import ButtonUniversal from "../../common/buttons/ButtonUniversal";

function CurrentUserReservation({ reservation }) {
  return (
    <>
      <h3>{reservation.tableID}</h3>
      <h5>{reservation.startTime}</h5>
      <h5>{reservation.endTime}</h5>
    </>
  );
}

export default CurrentUserReservation;
