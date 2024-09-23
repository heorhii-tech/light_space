import { useEffect, useState } from "react";
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

import { parseISO } from "date-fns";
import { useSelector } from "react-redux";
import useTimeFilters from "./useTimeFilters";
import useTables from "../useTables";

const useReservations = (handleCloseModalReservation) => {
  const user = useSelector((state) => state.user); // Get user data from Redux store
  const [currentUserReservations, setCurrentUserReservations] = useState([]); // State to store current user reservations
  const [passedUserReservations, setPassedUserReservations] = useState([]);
  const [reloadCurrentReservations, setReloadCurrentReservations] =
    useState(true); // Flag to trigger re-fetching of reservations
  const [disabledTimes, setDisabledTimes] = useState([]); // State to store reserved times for the current table
  const { filterTime, isTimeOverlapping, isReservationPast, timestampToDate } =
    useTimeFilters(disabledTimes); // Custom hook for time filtering functions
  const [currentTable, setCurrentTable] = useState(""); // State to store currently selected table
  const { fetchTables } = useTables();
  const [reservDate, setReservDate] = useState({
    startDate: null,
    endDate: null,
  }); // State to store reservation date range
  const [reserved, setReserved] = useState(false); // Flag to indicate if a reservation was made

  // Fetch current user reservations from Firestore
  const fetchCurrentUserReservations = async () => {
    const db = getFirestore();

    try {
      const q = query(
        collection(db, "reservation"),
        where("userID", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const currentReservations = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();
          return data.endTime !== isReservationPast(data.endTime);
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
      const passedReservations = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();
          return data.endTime == isReservationPast(data.endTime);
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

      setCurrentUserReservations(currentReservations);
      setPassedUserReservations(passedReservations);
      setReloadCurrentReservations(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // Delete a reservation by its ID
  const handleDeleteCurrentReservation = async (reservationID) => {
    const db = getFirestore();
    try {
      const reservationRef = doc(db, "reservation", reservationID);
      await deleteDoc(reservationRef);

      console.log("Reservation deleted successfully");
    } catch (e) {
      console.error("Error deleting reservation:", e);
    }
    setReloadCurrentReservations(true);
  };

  // Fetch reservations for the current table and update disabled times
  const fetchReservations = async (currentTable) => {
    const db = getFirestore();
    const q = query(
      collection(db, "reservation"),
      where("tableID", "==", currentTable.tableID)
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

  // Handle form submission to create a new reservation
  const handleSubmitForm = async (e, table) => {
    e.preventDefault();

    if (
      reservDate.startDate &&
      reservDate.endDate &&
      isTimeOverlapping(reservDate.startDate, reservDate.endDate, disabledTimes)
    ) {
      alert("The selected time overlaps with an existing reservation.");
      return;
    }

    try {
      const db = getFirestore();

      const docRef = await addDoc(collection(db, "reservation"), {
        startTime: reservDate.startDate,
        endTime: reservDate.endDate,
        tableID: table,
        userID: user.email,
      });
      if (docRef.id) {
        setReserved(true);
        fetchReservations(currentTable);
      }
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  // Close the reservation result modal and reset states
  const closeReservationResultModal = () => {
    setReserved(false);
    setReservDate((prevState) => ({
      ...prevState,
      startDate: null,
      endDate: null,
    }));
    setReloadCurrentReservations(true);
    handleCloseModalReservation();
  };

  // useEffect hooks
  useEffect(() => {
    if (reloadCurrentReservations) {
      fetchCurrentUserReservations();
    }
  }, [reloadCurrentReservations]);

  useEffect(() => {
    if (user.token) {
      fetchTables();
    }
  }, [user]);

  useEffect(() => {
    if (currentTable) {
      fetchReservations(currentTable);
    }
  }, [currentTable]);
 

  return {
    fetchCurrentUserReservations,
    currentUserReservations,
    setCurrentUserReservations,
    handleDeleteCurrentReservation,
    reloadCurrentReservations,
    setReloadCurrentReservations,
    currentTable,
    setCurrentTable,
    fetchReservations,
    closeReservationResultModal,
    handleSubmitForm,
    disabledTimes,
    filterTime,
    reserved,
    user,
    setReservDate,
    reservDate,
    passedUserReservations,
  };
};

export default useReservations;
