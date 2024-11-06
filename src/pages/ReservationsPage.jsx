import React from "react";

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
import Basket from "../components/shopping_cart/Cart";
import useCart from "../hooks/modals/useCart";
import SpinLoader from "../components/common/skeletons/SpinLoader";

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
    handleAddToCart,
    reservDate,
    filterTime,
    closeReservationModal,
    currentReservationAmount,
    handlePayment,
    tables,
    handleSubmitReservations,
    unApprovedReservations,
    totalAmount,
    contextHolder,
    paymentLoading,
    setPaymentLoading,
    reservationSuccessPaid,
    paymentMethods,
    isLoadingReservation,
  } = useReservations(handleCloseModalReserv);

  // Custom hook for formatting date and time
  const { formatDate, formatTime } = useTimeFilters();

  const { isCartOpen, cartActions } = useCart();

  const {} = useUser();
  const location = useLocation();
  const value = location.pathname === "/reservation" ? 0 : 1;

  return (
    <section className="reservation-page">
      <div className="extra-header__background"></div>
      <div className="reservation-page__wrapper">
        {contextHolder}
        {isLoadingReservation && <SpinLoader fullscreen={true} />}
        <div className="reservation-page__basket-nav-tabs">
          <NavTabs
            labelOne={`Current reservation`}
            labelTwo={`All reservations`}
            linkOne={`/reservation`}
            linkTwo={`/reservations_history`}
            value={value}
          />
          <Basket
            unApprovedReservations={unApprovedReservations}
            handleDeleteCurrentReservation={handleDeleteCurrentReservation}
            totalAmount={totalAmount}
            paymentMethods={paymentMethods}
            paymentLoading={paymentLoading}
            setPaymentLoading={setPaymentLoading}
            isCartOpen={isCartOpen}
            cartActions={cartActions}
            reservationSuccessPaid={reservationSuccessPaid}
          />
        </div>
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
            handleAddToCart={handleAddToCart}
            filterTime={filterTime}
            formatDate={formatDate}
            formatTime={formatTime}
            reservDate={reservDate}
            setReservDates={setReservDate}
            closeModal={closeReservationModal}
            currentReservationAmount={currentReservationAmount}
          />
          <SuccessResult
            reservDate={reservDate}
            currentTable={currentTable}
            formatDate={formatDate}
            formatTime={formatTime}
            closeModal={closeReservationModal}
            currentReservationAmount={currentReservationAmount}
            paymentFunction={handlePayment}
            submitReservations={handleSubmitReservations}
            cartActions={cartActions}
          />
        </BasicModal>
      </div>
    </section>
  );
}

export default ReservationsPage;
