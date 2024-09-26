import { useEffect } from "react";
import { aboutUsPageText, infoCards } from "../constants/constants";

const useAboutUs = () => {
  useEffect(() => {
    const headerElement = document.getElementById("header");
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return { aboutUsPageText, infoCards };
};
export default useAboutUs;
