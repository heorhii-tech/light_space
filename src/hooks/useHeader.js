import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import loginIcon from "../assets/login.png";
import logoutIcon from "../assets/exit.png";

import { headerHomeImg, headerContactImg } from "../constants/constants";
import ImageAboutUs from "../assets/aboutHeader.png";

const useHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [headerAuthLink, setHeaderAuthLink] = useState(`#`);
  const [pathImg, setPathImg] = useState(``);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [button, setButton] = useState(null);
  const [customStyleHeader, setCustomStyleHeader] = useState(false);

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
      location.pathname === `/reservation` ||
      location.pathname === `/reset_password` ||
      location.pathname === `/reservations_history`
    ) {
      setShowHeader(false);
      setCustomStyleHeader(true);
    } else {
      setShowHeader(true);
      setCustomStyleHeader(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setImage(headerHomeImg);
        setTitle(null);
        setButton("BOOK");
        break;
      case "/about_us":
        setImage(ImageAboutUs);
        setTitle("About us");
        setButton(null);
        break;
      case "/contact":
        setImage(headerContactImg);
        setTitle("Contact");
        setButton(null);
        break;

      default:
        setImage(null);
        setTitle(null);
        setButton(null);
        break;
    }
  }, [location.pathname]);
  function scrollToHeader() {
    const headerElement = document.getElementById("header");
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return {
    showHeader,
    setShowHeader,
    filterHeaderMenuFunction,
    headerAuthLink,
    pathImg,
    image,
    title,
    button,
    customStyleHeader,
    scrollToHeader,
  };
};
export default useHeader;
