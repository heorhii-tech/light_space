import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Result } from "antd";
import FocusedTable from "../tables/FocusedTable";
import ButtonUniversal from "../Button/ButtonUniversal";
import BackArrow from "../arrows/BackArrow";
import BackArrowIcon from "../../assets/arrow-right.png";

function ReservationForm({
  currentTable,
  reserved,
  handleSubmitForm,
  filterTime,
  formatDate,
  formatTime,
  user,
  closeReservResult,
  reservDate,
  setReservDates,
}) {
  return (
    <form
      className="reservation_form"
      onSubmit={(e) => handleSubmitForm(e, currentTable.tableID)}
    >
      <div className="arrow_focused_table_wrapper">
        <BackArrow
          func={closeReservResult}
          pathImg={BackArrowIcon}
          className={`back_arrow_reservation_modal`}
        />
        <FocusedTable focusedTable={currentTable} />
      </div>

      {reserved && (
        <Result
          status="success"
          title={`You reserved table ${currentTable.tableID}`}
          subTitle={`Reservation time ${formatDate(
            reservDate.startDate
          )} ${formatTime(reservDate.startDate)} - ${formatTime(
            reservDate.endDate
          )}`}
          extra={[
            <Button type="primary" key="console" onClick={closeReservResult}>
              CLOSE
            </Button>,
          ]}
        />
      )}

      {currentTable && !reserved && (
        <>
          <input
            type="text"
            placeholder={`Table: ` + currentTable.tableID}
            disabled
          ></input>
          <input
            type="text"
            placeholder={`Name: ` + user.name}
            disabled
          ></input>
          <DatePicker
            selected={reservDate.startDate}
            onChange={(date) =>
              setReservDates((prevState) => ({ ...prevState, startDate: date }))
            }
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select start time"
            minDate={new Date()}
            required
            minTime={
              reservDate.startDate
                ? new Date(reservDate.startDate.getTime() + 15 * 60000)
                : new Date() > new Date(new Date().setHours(9, 0, 0, 0))
                ? new Date()
                : new Date(new Date().setHours(9, 0, 0, 0))
            }
            maxTime={new Date().setHours(22, 0, 0, 0)}
            filterTime={filterTime}
          />

          <DatePicker
            selected={reservDate.endDate}
            onChange={(date) =>
              setReservDates((prevState) => ({ ...prevState, endDate: date }))
            }
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select end time"
            minDate={new Date()}
            required
            minTime={
              reservDate.startDate
                ? new Date(reservDate.startDate.getTime() + 15 * 60000)
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
            func={closeReservResult}
            title={`Cancel`}
          />
        </>
      )}
    </form>
  );
}

export default ReservationForm;
