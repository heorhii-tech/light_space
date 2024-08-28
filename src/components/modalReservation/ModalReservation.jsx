import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import ReservationForm from "../reservation_form/ReservationForm";
import BackArrow from "../arrows/BackArrow";
import arrowRight from "../../assets/arrow-right.png";
import FocusedTable from "../tables/FocusedTable";
import { useSelector } from "react-redux";

const ModalReservation = ({
  isModalReservationOpen,
  user,
  currentTable,
  setCurrentTable,
  handleCancelReservation,
}) => {
  const tables = useSelector((state) => state.tables);
  const [focusedTable, setFocusedTable] = useState(``);
  useEffect(() => {
    tables.map((table) => {
      if (table.tableID === currentTable) {
        setFocusedTable(table);
      }
    });
  }, [currentTable]);

  return (
    <>
      <Modal open={isModalReservationOpen} footer={null} closable={false}>
        <ReservationForm
          user={user}
          currentTable={currentTable}
          setCurrentTable={setCurrentTable}
          focusedTable={focusedTable}
          handleCancelReservation={handleCancelReservation}
        />
      </Modal>
    </>
  );
};
export default ModalReservation;
