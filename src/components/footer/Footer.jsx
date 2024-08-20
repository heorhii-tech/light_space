import React from "react";
import FooterInfo from "./FooterInfo";
import logo from "../../assets/logo.png";
import { tel, addres } from "../../constants/constants";

function Footer(props) {
  return (
    <footer>
      <FooterInfo logo={logo} addres={addres} tel={tel} />
    </footer>
  );
}

export default Footer;
