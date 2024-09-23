import React from "react";
import CurrentUserReservations from "../components/reservation/current_reservations/CurrentUserReservations";
import useReservations from "../hooks/reservation/useReservations";
import PassedReservations from "../components/reservation/passed_reservations/PassedReservations";
import Title from "../components/common/texts/Title";
import Description from "../components/common/texts/Description";
import NavTabs from "../components/common/nav_tabs/NavTabs";
import { useLocale } from "antd/es/locale";
import { useLocation } from "react-router-dom";

function ReservationHistoryPage(props) {
  const location = useLocation();
  const value = location.pathname === "/reservation" ? 0 : 1;
  const {
    currentUserReservations,
    handleDeleteCurrentReservation,
    passedUserReservations,
  } = useReservations();
  return (
    <div className="reservation-history-page">
      <div className="extra-header__background"></div>
      <div className="reservation-history-page__wrapper">
        <NavTabs
          labelOne={`Current reservation`}
          labelTwo={`All reservations`}
          linkOne={`/reservation`}
          linkTwo={`/reservations_history`}
          value={value}
        />

        <Description text={`Upcoming: `} />
        <CurrentUserReservations
          currentUserReservations={currentUserReservations}
          handleDeleteCurrentReservation={handleDeleteCurrentReservation}
          title={`You dont have current reservations`}
        />
        <Description text={`Previous: `} />
        <PassedReservations
          passedUserReservations={passedUserReservations}
          title={`You dont have passed reservations`}
        />
      </div>
    </div>
  );
}

export default ReservationHistoryPage;
