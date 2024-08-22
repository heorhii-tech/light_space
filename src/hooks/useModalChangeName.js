import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  updateName,
  updateTel,
  updateAvatar,
} from "../store/user/userSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useModalChangeName = () => {
  const user = useSelector((state) => state.user);
  const [isModaNameOpen, setIsModalNameOpen] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const showModalName = () => {
    setIsModalNameOpen(true);
  };
  const handleUpdateName = async (e) => {
    e.preventDefault();
    setIsModalNameOpen(false);
    try {
      await updateDoc(doc(db, "users", user.uid), { name });
      dispatch(updateName({ name: name }));
      setName("");
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };
  const handleCancelName = () => {
    setIsModalNameOpen(false);
  };
  return {
    showModalName,
    setIsModalNameOpen,
    handleCancelName,
    isModaNameOpen,
    handleUpdateName,
    name,
    setName,
  };
};
export default useModalChangeName;
