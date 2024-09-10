import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebaseConfig";
import { setTables } from "../store/tables/tablesSlice";

const useTables = () => {
  const dispatch = useDispatch();

  const fetchTables = async () => {
    const tablesCollectionRef = collection(db, "tables");
    try {
      const tablesDoc = await getDocs(tablesCollectionRef);
      const tablesList = tablesDoc.docs.map((doc) => doc.data());

      dispatch(setTables(tablesList));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchTables };
};
export default useTables;
