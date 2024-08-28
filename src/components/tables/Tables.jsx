import React, { useEffect } from "react";

import useTables from "../../hooks/useTables";
import { useSelector } from "react-redux";
import Table from "./Table";
import useReservation from "../../hooks/useReservation";
import { forgetCache } from "@apollo/client/cache/inmemory/reactiveVars";

function Tables({ setCurrentTable, currentTable, setIsModalReservationOpen }) {
  const { fetchTables, user } = useTables();
  const tables = useSelector((state) => state.tables);

  useEffect(() => {
    user.token && fetchTables();
  }, [user.token]);

  return (
    <div className="tables_wrapper">
      {tables.length &&
        tables.map((table, index) => {
          return (
            <Table
              setCurrentTable={setCurrentTable}
              currentTable={currentTable}
              key={index}
              table={table}
              setIsModalReservationOpen={setIsModalReservationOpen}
            />
          );
        })}
    </div>
  );
}

export default Tables;
