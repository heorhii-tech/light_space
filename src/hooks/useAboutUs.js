import { useEffect } from "react";
import { aboutUsPageText, infoCards } from "../constants/constants";

const useAboutUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return { aboutUsPageText, infoCards };
};
export default useAboutUs;
