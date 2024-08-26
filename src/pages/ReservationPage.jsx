import React, { useState } from "react";
import Tables from "../components/tables/Tables";
import ReservationForm from "../components/reservation_form/ReservationForm";

import { useSelector } from "react-redux";

function ReservationPage(props) {
  const user = useSelector((state) => state.user);
  const [currentTable, setCurrentTable] = useState(``);

  return (
    <div>
      <Tables setCurrentTable={setCurrentTable} />
      <ReservationForm
        user={user}
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
      />
    </div>
  );
}

export default ReservationPage;
