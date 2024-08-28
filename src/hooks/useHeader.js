import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import loginIcon from "../assets/login.png";
import logoutIcon from "../assets/exit.png";

const useHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [headerAuthLink, setHeaderAuthLink] = useState(`#`);
  const [pathImg, setPathImg] = useState(``);
  const user = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    setHeaderAuthLink(!user.token ? `/login` : `/`);
  }, [user.token]);
  useEffect(() => {
    setPathImg(!user.token ? loginIcon : logoutIcon);
  }, [user.token]);

  const filterHeaderMenuFunction = (data, token) => {
    if (token) {
      return data.filter(
        (item) => item.item !== `Sign Up` && item.item !== `Login`
      );
    } else {
      return data.filter(
        (item) => item.item !== `My Account` && item.item !== `Logout`
      );
    }
  };

  useEffect(() => {
    if (
      location.pathname === `/login` ||
      location.pathname === `/signup` ||
      location.pathname === `/my_account` ||
      location.pathname === `/reservation`
    ) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

  return {
    showHeader,
    setShowHeader,
    filterHeaderMenuFunction,
    headerAuthLink,
    pathImg,
  };
};
export default useHeader;
