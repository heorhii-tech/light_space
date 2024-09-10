import { useState } from "react";

const useModalReservation = () => {
  const [isModalReservationOpen, setIsModalReservationOpen] = useState(false);

  const showModalReservation = () => {
    setIsModalReservationOpen(true);
  };
  const handleSubmitReservation = () => {
    setIsModalReservationOpen(false);

    document.body.style.overflow = "auto";
  };
  const handleCloseModalReservation = () => {
    setIsModalReservationOpen(false);

    document.body.style.overflow = "auto";
  };
  return {
    setIsModalReservationOpen,
    showModalReservation,
    handleSubmitReservation,
    handleCloseModalReservation,
    isModalReservationOpen,
  };
};
export default useModalReservation;
