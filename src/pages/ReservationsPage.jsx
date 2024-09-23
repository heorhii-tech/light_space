import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CurrentUserReservations from "../components/reservation/current_reservations/CurrentUserReservations";
import useReservations from "../hooks/reservation/useReservations";
import Tables from "../components/tables/Tables";
import useModalReservation from "../hooks/reservation/useModalReservation";
import ModalReservation from "../components/reservation/ModalReservation";
import useTimeFilters from "../hooks/reservation/useTimeFilters";
import { NavLink, useLocation } from "react-router-dom";
import Title from "../components/common/texts/Title";
import useUser from "../hooks/useUser";
import BasicModal from "../components/common/modals/BasicModal";
import useBasicModalReserv from "../hooks/reservation/useBasicModal";
import ReservationForm from "../components/reservation/ReservationForm";
import NavTabs from "../components/common/nav_tabs/NavTabs";

function ReservationsPage(props) {
  // Custom hook for managing modal reservation state
  const {
    setIsModalReservationOpen,
    handleCloseModalReservation,
    isModalReservationOpen,
  } = useModalReservation();

  // Custom hook for fetching tables
  const { openModalReserv, handleCloseModalReserv, handleOpenModalReserv } =
    useBasicModalReserv();
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

  const {} = useUser();
  const location = useLocation();
  const value = location.pathname === "/reservation" ? 0 : 1;
  // Get tables data from Redux store
  const tables = useSelector((state) => state.tables.tables);

  return (
    <section className="reservation-page">
      <div className="extra-header__background"></div>
      <div className="reservation-page__wrapper">
        <NavTabs
          labelOne={`Current reservation`}
          labelTwo={`All reservations`}
          linkOne={`/reservation`}
          linkTwo={`/reservations_history`}
          value={value}
        />
        <Title text={`CHOOSE A TABLE`} />

        {/* Component to display tables and handle table selection */}

        <Tables
          tables={tables}
          setCurrentTable={setCurrentTable}
          setIsModalReservationOpen={handleOpenModalReserv}
        />
        {/* Component to display current user's reservations */}
        <Title text={`CURRENT RESERVATIONS`} />
        <CurrentUserReservations
          currentUserReservations={currentUserReservations}
          handleDeleteCurrentReservation={handleDeleteCurrentReservation}
          title={`You dont have current reservations`}
        />

        <BasicModal open={openModalReserv} handleClose={handleCloseModalReserv}>
          <ReservationForm
            user={user}
            currentTable={currentTable}
            reserved={reserved}
            handleSubmitForm={handleSubmitForm}
            filterTime={filterTime}
            formatDate={formatDate}
            formatTime={formatTime}
            reservDate={reservDate}
            setReservDates={setReservDate}
          />
        </BasicModal>

        {/* Modal for reservation creation or modification */}
        {isModalReservationOpen && (
          <>
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
    </section>
  );
}

export default ReservationsPage;
