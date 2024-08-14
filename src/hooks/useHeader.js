import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { headerMenu } from "../constants/constants";

const useHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const filterHeaderMenuFunction = (data) => {
    if (user.token) {
      return data.filter(
        (item) => item.item !== `Login` && item.item !== `Sign Up`
      );
    }else{
      return data;
    }
  };
  

  useEffect(() => {
    if (location.pathname === `/login` || location.pathname === `/signup`) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

  return { showHeader, setShowHeader, filterHeaderMenuFunction };
};
export default useHeader;
