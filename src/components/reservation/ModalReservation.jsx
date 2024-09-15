import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";

const ModalReservation = ({
  user,
  currentTable,
  setCurrentTable,
  reserved,
  closeReservResult,
  handleSubmitForm,
  filterTime,
  formatDate,
  formatTime,
  reservDate,
  setReservDates,
}) => {
  return (
    <ReservationForm
      user={user}
      currentTable={currentTable}
      reserved={reserved}
      handleSubmitForm={handleSubmitForm}
      filterTime={filterTime}
      formatDate={formatDate}
      formatTime={formatTime}
      closeReservResult={closeReservResult}
      reservDate={reservDate}
      setReservDates={setReservDates}
    />
  );
};
export default ModalReservation;
