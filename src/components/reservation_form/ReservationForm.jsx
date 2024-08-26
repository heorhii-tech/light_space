import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useReservation from "../../hooks/useReservation";
import { Button, Result } from "antd";

function ReservationForm({ currentTable, setCurrentTable }) {
  const {
    fetchReservations,
    user,
    reserved,
    filterTime,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleSubmitForm,
    formatDate,
    formatTime,
    closeReservResult,
  } = useReservation(currentTable, setCurrentTable);

  useEffect(() => {
    if (currentTable) {
      fetchReservations(currentTable);
    }
  }, [currentTable]);

  return (
    <form className="order_form" onSubmit={handleSubmitForm}>
      <p>Table: {currentTable}</p>
      <p>Name: {user.name}</p>
      {reserved && (
        <Result
          status="success"
          title={`You reserved table ${currentTable}`}
          subTitle={`Reservation time ${formatDate(startDate)} ${formatTime(
            startDate
          )} - ${formatTime(endDate)}`}
          extra={[
            <Button type="primary" key="console" onClick={closeReservResult}>
              Close
            </Button>,
          ]}
        />
      )}

      {currentTable && !reserved && (
        <>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select start time"
            minDate={new Date()}
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
            minDate={new Date()}
            minTime={
              startDate
                ? new Date(startDate.getTime() + 15 * 60000)
                : new Date().setHours(9, 0, 0, 0)
            }
            maxTime={new Date().setHours(22, 0, 0, 0)}
            filterTime={filterTime}
          />
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;
