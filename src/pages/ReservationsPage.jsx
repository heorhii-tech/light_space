import React from "react";
import { useSelector } from "react-redux";
import CurrentUserReservations from "../components/reservation/CurrentUserReservations";
import useReservations from "../hooks/reservation/useReservations";
import Tables from "../components/tables/Tables";
import useTables from "../hooks/useTables";
import useModalReservation from "../hooks/reservation/useModalReservation";
import ModalReservation from "../components/reservation/ModalReservation";
import useTimeFilters from "../hooks/reservation/useTimeFilters";

import { NavLink } from "react-router-dom";

function ReservationsPage(props) {
  // Custom hook for managing modal reservation state
  const {
    setIsModalReservationOpen,
    handleCloseModalReservation,
    isModalReservationOpen,
  } = useModalReservation();

  // Custom hook for fetching tables

  // Custom hook for handling reservations
  const {
    currentUserReservations,
    handleDeleteCurrentReservation,
    setReservDate,
    currentTable,
    setCurrentTable,
    user,
    closeReservationResultModal,
    reserved,
    handleSubmitForm,
    reservDate,
    filterTime,
  } = useReservations(handleCloseModalReservation);

  // Custom hook for formatting date and time
  const { formatDate, formatTime } = useTimeFilters();

  // Get tables data from Redux store
  const tables = useSelector((state) => state.tables.tables);

  return (
    <div>
      {/* Component to display current user's reservations */}
      <CurrentUserReservations
        currentUserReservations={currentUserReservations}
        handleDeleteCurrentReservation={handleDeleteCurrentReservation}
        title={`You dont have current reservations`}
      />
      <NavLink to={`/reservations_history`}>All reservations</NavLink>

      {/* Component to display tables and handle table selection */}
      <Tables
        tables={tables}
        setCurrentTable={setCurrentTable}
        setIsModalReservationOpen={setIsModalReservationOpen}
      />

      {/* Modal for reservation creation or modification */}
      {isModalReservationOpen && (
        <>
          <div className="overlay"></div>
          <ModalReservation
            user={user}
            currentTable={currentTable}
            tables={tables}
            reserved={reserved}
            handleSubmitForm={handleSubmitForm}
            filterTime={filterTime}
            formatDate={formatDate}
            formatTime={formatTime}
            closeReservResult={closeReservationResultModal}
            reservDate={reservDate}
            setReservDates={setReservDate}
          />
        </>
      )}
    </div>
  );
}

export default ReservationsPage;
