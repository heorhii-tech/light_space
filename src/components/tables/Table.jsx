import React from "react";

function Table({
  setCurrentTable,
  table,
  currentTable,
  setIsModalReservationOpen,
}) {
  return (
    <div
      className="table_card"
      style={{ backgroundImage: `url(${table.img})` }}
      onClick={() => {
        setCurrentTable(table.tableID);
        setIsModalReservationOpen(true);
      }}
    >
      <p>{table.tableID}</p>
      <h5>{table.title}</h5>
    </div>
  );
}

export default Table;
