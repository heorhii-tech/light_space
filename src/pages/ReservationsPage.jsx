import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CurrentUserReservations from "../components/reservation/current_reservations/CurrentUserReservations";
import useReservations from "../hooks/reservation/useReservations";
import Tables from "../components/tables/Tables";
import useTimeFilters from "../hooks/reservation/useTimeFilters";
import { useLocation } from "react-router-dom";
import Title from "../components/common/texts/Title";
import useUser from "../hooks/useUser";
import BasicModal from "../components/reservation/ReservationModal";
import useBasicModalReserv from "../hooks/reservation/useBasicModal";
import ReservationForm from "../components/reservation/ReservationForm";
import NavTabs from "../components/common/nav_tabs/NavTabs";
import SuccessResult from "../components/reservation/SuccessReservResult";
import { usePayment } from "../hooks/payment/usePayment";

function ReservationsPage(props) {
  // Custom hook for managing modal reservation state

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
    reserved,
    handleSubmitForm,
    reservDate,
    filterTime,
    closeReservationModal,
    amount,
  } = useReservations(handleCloseModalReserv);

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

        <BasicModal
          open={openModalReserv}
          handleClose={closeReservationModal}
          reserved={reserved}
        >
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
            closeModal={closeReservationModal}
            amount={amount}
          />
          <SuccessResult
            reservDate={reservDate}
            currentTable={currentTable}
            formatDate={formatDate}
            formatTime={formatTime}
            closeModal={closeReservationModal}
          />
        </BasicModal>
      </div>
    </section>
  );
}

export default ReservationsPage;
