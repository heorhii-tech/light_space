import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useReservation from "../../hooks/useReservation";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";

function ReservationForm({ currentTable }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    fetchReservations,
    user,
    setTable,
    disabledTimes,
    filterTime,
    isTimeOverlapping,
  } = useReservation();

  useEffect(() => {
    if (currentTable) {
      fetchReservations(currentTable);
    }
  }, [currentTable]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (
      startDate &&
      endDate &&
      isTimeOverlapping(startDate, endDate, disabledTimes)
    ) {
      alert("The selected time overlaps with an existing reservation.");
      return;
    }

    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "reservation"), {
        startTime: startDate,
        endTime: endDate,
        tableID: currentTable,
        userID: user.email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form className="order_form" onSubmit={handleSubmitForm}>
      <p>Table: {currentTable}</p>
      <p>Name: {user.name}</p>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeIntervals={15}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select start time"
        minTime={
          startDate
            ? new Date(startDate.getTime() + 15 * 60000)
            : new Date(new Date().setHours(9, 0, 0, 0))
        }
        maxTime={new Date().setHours(22, 0, 0, 0)}
        filterTime={filterTime}
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        timeIntervals={15}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select end time"
        minTime={
          startDate
            ? new Date(startDate.getTime() + 15 * 60000)
            : new Date().setHours(9, 0, 0, 0)
        }
        maxTime={new Date().setHours(22, 0, 0, 0)}
        filterTime={filterTime}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;
