import React, { useEffect } from "react";
import Table from "./Table";
import AvatarLoader from "../common/skeletons/AvatarLoader";

function Tables({
  setCurrentTable,
  currentTable,
  setIsModalReservationOpen,
  tables,
}) {
  return (
    <div className="tables_wrapper">
      {tables.length
        ? tables.map((table, index) => {
            return (
              <Table
                setCurrentTable={setCurrentTable}
                currentTable={currentTable}
                key={index}
                table={table}
                setIsModalReservationOpen={setIsModalReservationOpen}
              />
            );
          })
        : new Array(8).fill(null).map((_, index) => {
            return <AvatarLoader key={index} />;
          })}
    </div>
  );
}

export default Tables;
