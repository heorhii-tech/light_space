import React from "react";

function Table({ setCurrentTable, table, setIsModalReservationOpen }) {
  return (
    <div
      className="table_card"
      style={{ backgroundImage: `url(${table.img})` }}
      onClick={() => {
        setCurrentTable(table);
        setIsModalReservationOpen(true);
      }}
    >
      <p>{table.tableID}</p>
      <h5>{table.title}</h5>
      <h6>{table.price} €/hr</h6>
    </div>
  );
}

export default Table;
