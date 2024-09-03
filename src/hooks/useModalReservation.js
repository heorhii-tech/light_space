import { useState } from "react";

const useModalReservation = (setReloadCurrentUserReservations) => {
  const [isModalReservationOpen, setIsModalReservationOpen] = useState(false);
  const showModalReservation = () => {
    setIsModalReservationOpen(true);
  };
  const handleSubmitReservation = () => {
    setIsModalReservationOpen(false);
    document.body.style.overflow = "auto";
  };
  const handleCancelReservation = () => {
    setIsModalReservationOpen(false);
    setReloadCurrentUserReservations(true);
    document.body.style.overflow = "auto";
  };
  return {
    setIsModalReservationOpen,
    showModalReservation,
    handleSubmitReservation,
    handleCancelReservation,
    isModalReservationOpen,
  };
};
export default useModalReservation;
