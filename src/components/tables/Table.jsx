import React from "react";

function Table({ setCurrentTable, table }) {
  return (
    <div className="table_card" onClick={() => setCurrentTable(table.tableID)}>
      <p>Table number: {table.tableID}</p>
    </div>
  );
}

export default Table;
