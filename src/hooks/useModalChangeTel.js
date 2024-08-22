import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  updateName,
  updateTel,
  updateAvatar,
} from "../store/user/userSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const useModalChangeTel = () => {
  const [tel, setTel] = useState("");
  const [isModaTelOpen, setIsModalTelOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleUpdateTel = async (e) => {
    e.preventDefault();
    setIsModalTelOpen(false);
    try {
      await updateDoc(doc(db, "users", user.uid), { tel: tel });
      dispatch(updateTel({ tel: tel }));
      setTel("");
    } catch (error) {
      console.error("Error updating tel:", error);
    }
  };
  const showModalTel = () => {
    setIsModalTelOpen(true);
  };
  const handleCancelTel = () => {
    setIsModalTelOpen(false);
  };

  return {
    tel,
    setTel,
    showModalTel,
    handleCancelTel,
    handleUpdateTel,
    isModaTelOpen,
  };
};
export default useModalChangeTel;
