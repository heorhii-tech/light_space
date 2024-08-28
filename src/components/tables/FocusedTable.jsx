import React from "react";
import BackArrow from "../arrows/BackArrow";

function FocusedTable({ focusedTable }) {
  return (
    <div
      className="focused_table"
      style={{ backgroundImage: `url(${focusedTable.img})` }}
    >
      <p>{focusedTable.tableID}</p>
    </div>
  );
}

export default FocusedTable;
