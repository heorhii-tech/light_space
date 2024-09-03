import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useReservation from "../../hooks/useReservation";
import { Button, Result } from "antd";
import FocusedTable from "../tables/FocusedTable";
import ButtonUniversal from "../Button/ButtonUniversal";
import BackArrow from "../arrows/BackArrow";
import BackArrowIcon from "../../assets/arrow-right.png";

function ReservationForm({
  currentTable,
  setCurrentTable,
  focusedTable,
  handleCancelReservation,
}) {
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
  } = useReservation(currentTable, setCurrentTable);

  useEffect(() => {
    if (currentTable) {
      fetchReservations(currentTable);
    }
  }, [currentTable]);

  return (
    <form className="reservation_form" onSubmit={handleSubmitForm}>
      <div className="arrow_focused_table_wrapper">
        <BackArrow
          func={handleCancelReservation}
          pathImg={BackArrowIcon}
          className={`back_arrow_reservation_modal`}
        />
        <FocusedTable focusedTable={focusedTable} />
      </div>

      {reserved && (
        <Result
          status="success"
          title={`You reserved table ${currentTable}`}
          subTitle={`Reservation time ${formatDate(startDate)} ${formatTime(
            startDate
          )} - ${formatTime(endDate)}`}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={handleCancelReservation}
            >
              Close
            </Button>,
          ]}
        />
      )}

      {currentTable && !reserved && (
        <>
          <input
            type="text"
            placeholder={`Table: ` + currentTable}
            disabled
          ></input>
          <input
            type="text"
            placeholder={`Name: ` + user.name}
            disabled
          ></input>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select start time"
            minDate={new Date()}
            required
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
            required
            minTime={
              startDate
                ? new Date(startDate.getTime() + 15 * 60000)
                : new Date().setHours(9, 0, 0, 0)
            }
            maxTime={new Date().setHours(22, 0, 0, 0)}
            filterTime={filterTime}
          />
          <button className="primary-button button" type="submit">
            Submit
          </button>
          <ButtonUniversal
            className={`button_cancel_reservation button`}
            func={handleCancelReservation}
            title={`Cancel`}
          />
        </>
      )}
    </form>
  );
}

export default ReservationForm;
