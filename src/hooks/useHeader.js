import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { headerMenu } from "../constants/constants";

const useHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();

  const filterHeaderMenuFunction = (data, token) => {
    if (token) {
      return data.filter(
        (item) => item.item !== `Sign Up` && item.item !== `Login`
      );
    } else {
      return data.filter((item) => item.item !== `My Account`);
    }
  };

  useEffect(() => {
    if (
      location.pathname === `/login` ||
      location.pathname === `/signup` ||
      location.pathname === `/my_account`
    ) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

  return { showHeader, setShowHeader, filterHeaderMenuFunction };
};
export default useHeader;
