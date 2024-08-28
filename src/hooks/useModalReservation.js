import { useState } from "react";

const useModalReservation = () => {
  const [isModalReservationOpen, setIsModalReservationOpen] = useState(false);
  const showModalReservation = () => {
    setIsModalReservationOpen(true);
  };
  const handleSubmitReservation = () => {
    setIsModalReservationOpen(false);
  };
  const handleCancelReservation = () => {
    setIsModalReservationOpen(false);
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
