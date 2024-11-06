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
import { useSelector, useDispatch } from "react-redux";
import useTimeFilters from "./useTimeFilters";
import useTables from "../useTables";
import { usePayment } from "../payment/usePayment";
import { message } from "antd";

const useReservations = (handleCloseModalReservation) => {
  const user = useSelector((state) => state.user); // Get user data from Redux store
  const [currentUserReservations, setCurrentUserReservations] = useState([]); // State to store current user reservations
  const [passedUserReservations, setPassedUserReservations] = useState([]);
  const [reloadCurrentReservations, setReloadCurrentReservations] =
    useState(true); // Flag to trigger re-fetching of reservations
  const [disabledTimes, setDisabledTimes] = useState([]); // State to store reserved times for the current table
  const [currentTable, setCurrentTable] = useState(""); // State to store currently selected table
  const { fetchTables } = useTables();
  const [reservDate, setReservDate] = useState({
    startDate: null,
    endDate: null,
  }); // State to store reservation date range

  const [unApprovedReservations, setUnApprovedReservations] = useState([]);
  const [reserved, setReserved] = useState(false); // Flag to indicate if a reservation was made
  // show reservation time error
  const [reservError, setReserError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoadingReservation, setIsLoadingReservation] = useState(false);

  // Get tables data from Redux store
  let tables = useSelector((state) => state.tables.tables);

  const {
    filterTime,
    isReservationPast,
    timestampToDate,
    validateReservationTime,
  } = useTimeFilters(disabledTimes); // Custom hook for time filtering functions

  const {
    calculateHours,
    setCurrentReservationHours,
    currentReservationHours,
    calculateAmount,
    setCurrentreservatinAmount,
    currentReservationAmount,
    isPaymentLoading,
    totalAmount,
    handlePayByCash,
    reservationSuccessPaid,
    handlePayOnline,
    paymentLoading,
    setPaymentLoading,
    paymentMethods,
  } = usePayment(unApprovedReservations);

  const handleAddToCart = async (e, table) => {
    e.preventDefault();
    setIsLoadingReservation(true);
    const startTime = reservDate.startDate;
    const endTime = reservDate.endDate;
    const error = validateReservationTime(startTime, endTime, disabledTimes);

    if (error !== null) {
      setReserError(error);
      return;
    }

    try {
      const db = getFirestore();

      const docRef = await addDoc(collection(db, "reservations"), {
        startTime: reservDate.startDate,
        endTime: reservDate.endDate,
        tableID: table.tableID,
        userID: user.email,
        price: currentReservationAmount,
        approved: false,
        paid: false,
        paymentMethod: null,
      });
      if (docRef.id) {
        setReserved(true);
        fetchReservations(currentTable);
      }
    } catch (e) {
      console.error("Error adding document:", e);
      console.log(e);
    }
    setIsLoadingReservation(false);
  };

  //
  const handleSubmitReservations = async (e) => {
    e.preventDefault();

    try {
      const db = getFirestore();
      unApprovedReservations.map((reservation) => {
        addDoc(collection(db, "reservations"), {
          startTime: reservation.startTime,
          endTime: reservation.endTime,
          tableID: reservation.tableID,
          userID: reservation.userID,
          price: reservation.price,
        });
      });

      if (docRef.id) {
        setReserved(false);
        fetchReservations(currentTable);
        setCurrentreservatinAmount(0);
      }
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };
  // Fetch current user reservations from Firestore
  const fetchCurrentUserReservations = async () => {
    const db = getFirestore();

    try {
      const q = query(
        collection(db, "reservations"),
        where("userID", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const currentReservations = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();
          return (
            data.endTime !== isReservationPast(data.endTime) && data.approved
          );
        })
        .map((doc) => {
          const data = doc.data();

          return {
            reservationID: doc.id,
            tableID: data.tableID,
            userEmail: data.userID,
            startTime: timestampToDate(data.startTime),
            endTime: timestampToDate(data.endTime),
            paymentMethod: data.paymentMethod,
            paid: data.paid,
            price: data.price,
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
            paymentMethod: data.paymentMethod,
            paid: data.paid,
            price: data.price,
          };
        });
      const unApprovedReservations = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();

          return data.approved === false;
        })
        .map((doc) => {
          const data = doc.data();

          return {
            reservationID: doc.id,
            tableID: data.tableID,
            userEmail: data.userID,
            startTime: timestampToDate(data.startTime),
            endTime: timestampToDate(data.endTime),
            timeStampStart: data.startTime,
            timeStampEnd: data.endTime,
            price: data.price,
          };
        });

      setCurrentUserReservations(currentReservations);
      setPassedUserReservations(passedReservations);
      setUnApprovedReservations(unApprovedReservations);
      setReloadCurrentReservations(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      console.log(error);
    }
  };

  // Delete a reservation by its ID
  const handleDeleteCurrentReservation = async (reservationID) => {
    setIsLoadingReservation(true);
    const db = getFirestore();
    try {
      const reservationRef = doc(db, "reservations", reservationID);
      await deleteDoc(reservationRef);
    } catch (e) {
      console.error("Error deleting reservation:", e);
    }
    setReloadCurrentReservations(true);
    setIsLoadingReservation(false);
  };

  // Fetch reservations for the current table and update disabled times
  const fetchReservations = async (currentTable) => {
    const db = getFirestore();
    const q = query(
      collection(db, "reservations"),
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

  // Close the reservation result modal and reset states
  const closeReservationModal = () => {
    setReserved(false);
    setReservDate((prevState) => ({
      ...prevState,
      startDate: null,
      endDate: null,
    }));
    setReloadCurrentReservations(true);
    handleCloseModalReservation();
    setCurrentreservatinAmount(null);
    setCurrentReservationHours(null);
  };

  // useEffect hooks
  useEffect(() => {
    if (reloadCurrentReservations) {
      fetchCurrentUserReservations();
    }
  }, [reloadCurrentReservations]);
  //fetch tables if user is confirmed
  useEffect(() => {
    if (user.token) {
      fetchTables();
    }
  }, [user]);
  // fetch reservations for selected table
  useEffect(() => {
    if (currentTable) {
      fetchReservations(currentTable);
    }
  }, [currentTable]);
  // update user's reservations
  useEffect(() => {
    reserved && fetchCurrentUserReservations();
  }, [reserved]);
  // scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (reservDate.startDate !== null && reservDate.endDate !== null) {
      const startTime = new Date(reservDate.startDate);
      const startSeconds = Math.floor(startTime.getTime() / 1000);
      const endTime = new Date(reservDate.endDate);
      const endSeconds = Math.floor(endTime.getTime() / 1000);
      setCurrentReservationHours(calculateHours(startSeconds, endSeconds));
    }
  }, [reservDate]);

  useEffect(() => {
    if (currentReservationHours !== null && currentTable.price) {
      const amount = calculateAmount(
        currentReservationHours,
        currentTable.price
      );

      setCurrentreservatinAmount(amount);
    }
  }, [currentReservationHours, currentTable.price]);

  useEffect(() => {
    reservationSuccessPaid && fetchCurrentUserReservations();
  }, [reservationSuccessPaid]);

  //show reservation time error
  useEffect(() => {
    if (reservError) {
      messageApi.open({
        type: "error",
        content: reservError,
      });
    }
  }, [reservError, messageApi]);

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
    closeReservationModal,
    totalAmount,
    disabledTimes,
    filterTime,
    reserved,
    user,
    setReservDate,
    reservDate,
    passedUserReservations,
    currentReservationAmount,
    isPaymentLoading,
    handleSubmitReservations,
    tables,
    unApprovedReservations,
    handlePayByCash,
    handleAddToCart,
    paymentLoading,
    setPaymentLoading,
    reservationSuccessPaid,
    handlePayOnline,
    paymentMethods,
    contextHolder,
    isLoadingReservation,
  };
};

export default useReservations;
