import React, { useEffect, useState } from "react";
import Tables from "../components/tables/Tables";
import { useSelector } from "react-redux";
import ModalReservation from "../components/modalReservation/ModalReservation";
import useModalReservation from "../hooks/useModalReservation";

import { useLocation } from "react-router-dom";

import useReservation from "../hooks/useReservation";
import CurrentUserReservation from "../components/reservation_form/CurrentUserReservation";
import useMyAcc from "../hooks/useMyAcc";

function ReservationPage(props) {
  const user = useSelector((state) => state.user);
  const [currentTable, setCurrentTable] = useState(``);
  const {
    fetchCurrentUserReservations,
    currentUserReservation,
    reloadCurrentUserReservations,
    setReloadCurrentUserReservations,
  } = useReservation();

  const {
    handleCancelReservation,
    isModalReservationOpen,
    setIsModalReservationOpen,
  } = useModalReservation(setReloadCurrentUserReservations);

  const { fetchUserData } = useMyAcc();

  useEffect(() => {
    if (user.uid) {
      fetchUserData();
    }
  }, [user.uid]);

  useEffect(() => {
    reloadCurrentUserReservations && fetchCurrentUserReservations();
  }, [reloadCurrentUserReservations]);

  useEffect(() => {
    fetchCurrentUserReservations();
  }, []);

  return (
    <div className="reservation_page_wrapper">
      <h3 className="title">Booking Calendar</h3>
      <p className="sub_title">Your current reservations:</p>
      <CurrentUserReservation
        currentUserReservation={currentUserReservation}
        className={`current_resrvation_wrapper`}
        setReloadCurrentUserReservations={setReloadCurrentUserReservations}
      />
      <h4 className="sub_title">Choose a table:</h4>
      <Tables
        setCurrentTable={setCurrentTable}
        currentTable={currentTable}
        setIsModalReservationOpen={setIsModalReservationOpen}
      />
      {isModalReservationOpen && (
        <>
          <div className="overlay"></div>
          <ModalReservation
            isModalReservationOpen={isModalReservationOpen}
            user={user}
            currentTable={currentTable}
            setCurrentTable={setCurrentTable}
            handleCancelReservation={handleCancelReservation}
          />
        </>
      )}
    </div>
  );
}

export default ReservationPage;
