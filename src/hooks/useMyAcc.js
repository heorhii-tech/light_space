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

const useMyAcc = () => {
  const [file, setFile] = useState("");

  const [tel, setTel] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [changePhone, setChangePhone] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchUserData = async () => {
    if (user.token && user.uid) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(updateTel({ tel: userData.tel }));
          dispatch(updateName({ name: userData.name }));
          dispatch(updateAvatar({ avatar: userData.avatar }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const uploadAvatar = async (file, userUid) => {
    const storageRef = ref(getStorage(), `avatars/${userUid}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(db, "users", user.uid), { avatar: downloadURL });
      dispatch(updateAvatar({ avatar: downloadURL }));
      setFile("");
      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.uid), { name });
      dispatch(updateName({ name: name }));
      setName("");
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleUpdateTel = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.uid), { tel: tel });
      dispatch(updateTel({ tel: tel }));
      setTel("");
    } catch (error) {
      console.error("Error updating tel:", error);
    }
  };

  const handleUnLogin = () => {
    dispatch(clearUser());
  };

  return {
    fetchUserData,
    uploadAvatar,
    setFile,

    handleUpdateTel,
    handleUnLogin,

    tel,
    setTel,
    file,
    setChangeName,
    changeName,
    changePhone,
    setChangePhone,
  };
};

export default useMyAcc;
