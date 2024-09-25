import React from "react";
import { useDispatch } from "react-redux";

import { clearUser } from "../store/user/userSlice";

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
