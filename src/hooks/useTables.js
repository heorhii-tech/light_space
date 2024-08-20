import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebaseConfig";
import { setTables } from "../store/tables/tablesSlice";
import { useEffect } from "react";

const useTables = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchTables = async () => {
    if (user.token) {
      const tablesCollectionRef = collection(db, "tables");
      try {
        const tablesDoc = await getDocs(tablesCollectionRef);
        const tablesList = tablesDoc.docs.map((doc) => doc.data());

        dispatch(setTables(tablesList));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { fetchTables, user };
};
export default useTables;
