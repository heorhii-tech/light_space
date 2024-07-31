import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Импортируйте вашу конфигурацию Firebase
import { setUser, clearUser } from "../store/user/userSlice"; // Импортируйте ваш action для обновления пользователя в Redux
const useMyAccount = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleUnLogin = () => {
    dispatch(clearUser());
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: name,
      });

      dispatch(
        setUser({
          token: user.accessToken,
          name: user.displayName,
          email: user.email,
        })
      );

      setName("");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };
  return { handleUpdateProfile, setName, handleUnLogin, name };
};

export default useMyAccount;
