import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FocusedTable from "../tables/FocusedTable";
import ButtonUniversal from "../common/buttons/ButtonUniversal";

function ReservationForm({
  currentTable,
  reserved,
  handleAddToCart,
  filterTime,
  user,
  closeModal,
  reservDate,
  setReservDates,
  currentReservationAmount,
}) {
  return (
    <form
      className="reservation_form"
      onSubmit={(e) => {
        handleAddToCart(e, currentTable);
      }}
    >
      <div className="focused_table_wrapper">
        <FocusedTable focusedTable={currentTable} />
        <h3>
          Total price: {currentReservationAmount ? currentReservationAmount : 0}{" "}
          €
        </h3>
      </div>

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
            Add reservation to your cart
          </button>
          <ButtonUniversal
            className={`cancel_button button`}
            func={closeModal}
            title={`Cancel`}
            type={`button`}
          />
        </>
      )}
    </form>
  );
}

export default ReservationForm;
