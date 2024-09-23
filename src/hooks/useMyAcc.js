import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearUser,
  updateName,
  updateTel,
  updateAvatar,
} from "../store/user/userSlice";

import AutoRedirect from "../components/autoRedirect/AutoRedirect";

const useMyAcc = () => {
  const dispatch = useDispatch();
  const handleUnLogin = () => {
    <AutoRedirect to={`/`} delay={10} />;
    dispatch(clearUser());
  };

  return {
    handleUnLogin,
  };
};

export default useMyAcc;
