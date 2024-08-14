import React from "react";

function ReservationPage(props) {
  const handleReserv = () => {
    console.log(18);
  };
  return (
    <div>
      Reservation
      <button onClick={handleReserv}>Reserv</button>
    </div>
  );
}

export default ReservationPage;
