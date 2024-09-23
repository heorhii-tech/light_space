import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateName, updateTel, updateAvatar } from "../store/user/userSlice";
const useUser = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fetchUserData = async () => {
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
  };

  useEffect(() => {
    user.uid && fetchUserData();
  }, [user]);
  return {};
};

export default useUser;
