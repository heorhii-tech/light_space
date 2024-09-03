import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { parseISO, addMinutes } from "date-fns";

const useReservation = (currentTable) => {
  const user = useSelector((state) => state.user);
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reserved, setReserved] = useState(false);
  const [currentUserReservation, setCurrentUserReservation] = useState([]);
  const [reloadCurrentUserReservations, setReloadCurrentUserReservations] =
    useState(false);

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

  const fetchCurrentUserReservations = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "reservation"),
      where("userID", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const reservations = querySnapshot.docs
      .filter((doc) => {
        const data = doc.data();

        if (data.endTime !== isReservationPast(data.endTime)) {
          return data;
        }
      })
      .map((doc) => {
        const data = doc.data();

        return {
          reservationID: doc.id,
          tableID: data.tableID,
          userEmail: data.userID,
          startTime: timestampToDate(data.startTime),
          endTime: timestampToDate(data.endTime),
        };
      });

    setCurrentUserReservation(reservations);
    setReloadCurrentUserReservations(false);
  };

  const isReservationPast = (endTime) => {
    const endTimeMilliseconds =
      endTime.seconds * 1000 + Math.floor(endTime.nanoseconds / 1000000);

    if (endTimeMilliseconds < new Date().getTime()) {
      return endTime;
    }
  };

  const handleDeletCurrentReservation = async (reservationID) => {
    const db = getFirestore();
    try {
      const reservationRef = doc(db, "reservation", reservationID);
      await deleteDoc(reservationRef);

      console.log("Reservation deleted successfully");
    } catch (e) {
      console.error("Error deleting reservation: ", e);
    }
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
      weekday: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function timestampToDate(timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return date.toLocaleString();
  }

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
        setReloadCurrentUserReservations(true);
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
    fetchCurrentUserReservations,
    currentUserReservation,
    handleDeletCurrentReservation,
    setReloadCurrentUserReservations,
    reloadCurrentUserReservations,
  };
};

export default useReservation;
