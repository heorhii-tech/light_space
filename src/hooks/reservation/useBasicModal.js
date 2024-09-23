import { useState } from "react";

const useBasicModalReserv = () => {
  const [openModalReserv, setOpenModalReserv] = useState(false);
  const handleOpenModalReserv = () => setOpenModalReserv(true);
  const handleCloseModalReserv = () => setOpenModalReserv(false);
  return { openModalReserv, handleCloseModalReserv, handleOpenModalReserv };
};
export default useBasicModalReserv;
