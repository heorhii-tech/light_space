import "react-datepicker/dist/react-datepicker.css";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { parseISO, addMinutes } from "date-fns";
import { useSelector } from "react-redux";
import { useState } from "react";

const useReservation = () => {
  const user = useSelector((state) => state.user);
  const [disabledTimes, setDisabledTimes] = useState([]);

  const fetchReservations = async (currentTable) => {
    const db = getFirestore();
    const q = query(
      collection(db, "reservation"),
      where("tableID", "==", currentTable)
    );

    const querySnapshot = await getDocs(q);
    const reservedTimes = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        start: parseISO(data.startTime.toDate().toISOString()),
        end: parseISO(data.endTime.toDate().toISOString()),
      };
    });
    setDisabledTimes(reservedTimes);
  };
  const isTimeOverlapping = (newStart, newEnd, reservedTimes) => {
    return reservedTimes.some(
      ({ start, end }) => newStart < end && newEnd > start
    );
  };
  const filterTime = (time) => {
    return !isTimeOverlapping(time, addMinutes(time, 15), disabledTimes);
  };

  return {
    fetchReservations,
    user,
    disabledTimes,
    filterTime,
    isTimeOverlapping,
  };
};
export default useReservation;
