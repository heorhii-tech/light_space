import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../store/user/userSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const useModalChangeAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const [isModAvatarOpen, setIsModalTelAvatarOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const showModalAvatar = () => {
    setIsModalTelAvatarOpen(true);
  };
  const handleCancelAvatar = () => {
    setIsModalTelAvatarOpen(false);
  };
  const uploadAvatar = async (file, userUid) => {
    setIsModalTelAvatarOpen(false);
    setIsLoading(true);
    const storageRef = ref(getStorage(), `avatars/${userUid}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(db, "users", user.uid), { avatar: downloadURL });
      dispatch(updateAvatar({ avatar: downloadURL }));
      setIsLoading(false);
      setAvatar("");
      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return {
    setAvatar,
    avatar,
    showModalAvatar,
    handleCancelAvatar,
    isModAvatarOpen,
    uploadAvatar,
    isloading,
  };
};
export default useModalChangeAvatar;
