import React, { useState } from "react";
import Tables from "../components/tables/Tables";
import { useSelector } from "react-redux";
import ModalReservation from "../components/modalReservation/ModalReservation";
import useModalReservation from "../hooks/useModalReservation";

function ReservationPage(props) {
  const user = useSelector((state) => state.user);
  const [currentTable, setCurrentTable] = useState(``);

  const {
    showModalReservation,
    handleSubmitReservation,
    handleCancelReservation,
    isModalReservationOpen,
    setIsModalReservationOpen,
  } = useModalReservation();

  return (
    <div className="reservation_page_wrapper">
      <h3 className="title">Booking Calendar</h3>
      <Tables
        setCurrentTable={setCurrentTable}
        currentTable={currentTable}
        setIsModalReservationOpen={setIsModalReservationOpen}
      />
      {isModalReservationOpen && (
        <ModalReservation
          isModalReservationOpen={isModalReservationOpen}
          user={user}
          currentTable={currentTable}
          setCurrentTable={setCurrentTable}
          handleCancelReservation={handleCancelReservation}
        />
      )}
    </div>
  );
}

export default ReservationPage;
