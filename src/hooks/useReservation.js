import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { parseISO, addMinutes } from "date-fns";

const useReservation = (currentTable, setCurrentTable) => {
  const user = useSelector((state) => state.user);
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reserved, setReserved] = useState(false);

  /*useEffect(() => {
    const timer = setTimeout(() => {
      setEndDate(``);
      setStartDate(``);
      setCurrentTable(null);
      setReserved(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [reserved]);
*/
  const closeReservResult = () => {
    setReserved(false);
  };
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
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Например, "Mon"
      day: "numeric", // Например, "26"
    });
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
      if (docRef.id) {
        setReserved(true);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return {
    fetchReservations,
    user,
    disabledTimes,
    filterTime,
    isTimeOverlapping,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reserved,
    setReserved,
    handleSubmitForm,
    formatDate,
    formatTime,
    closeReservResult,
  };
};

export default useReservation;
