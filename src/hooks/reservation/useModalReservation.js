import { useEffect, useState } from "react";

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
  useEffect(() => {
    if (isModalReservationOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `23px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isModalReservationOpen]);
  return {
    setIsModalReservationOpen,
    showModalReservation,
    handleSubmitReservation,
    handleCloseModalReservation,
    isModalReservationOpen,
  };
};
export default useModalReservation;
