import React, { useEffect } from "react";

import useTables from "../../hooks/useTables";
import { useSelector } from "react-redux";
import Table from "./Table";
import useReservation from "../../hooks/useReservation";

function Tables({ setCurrentTable }) {
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
              key={index}
              table={table}
            />
          );
        })}
    </div>
  );
}

export default Tables;
