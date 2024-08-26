import { useLocation } from "react-router-dom";
import ImageHome from "../assets/header2.svg";
import ImageAboutUs from "../assets/aboutHeader.png";

const useLayout = () => {
  let image;
  let title;
  let button;
  const location = useLocation();

  switch (location.pathname) {
    case "/":
      image = ImageHome;
      title = null;
      button = `BOOK`;
      break;
    case "/about_us":
      image = ImageAboutUs;
      title = `About us`;
      button = null;
      break;
  }

  return { image, title, button };
};
export default useLayout;
