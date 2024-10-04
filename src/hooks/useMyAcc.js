import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { clearUser } from "../store/user/userSlice";

import AutoRedirect from "../components/autoRedirect/AutoRedirect";

const useMyAcc = () => {
  const dispatch = useDispatch();
  const handleUnLogin = () => {
    <AutoRedirect to={`/`} delay={10} />;
    dispatch(clearUser());
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return {
    handleUnLogin,
  };
};

export default useMyAcc;
