import React from "react";
import { Link, NavLink } from "react-router-dom";
import useHeader from "../../hooks/useHeader";

function FooterNav({ footerMenu }) {
  const { scrollToHeader } = useHeader();
  return (
    footerMenu.length &&
    footerMenu.map((link) => {
      return (
        <NavLink onClick={scrollToHeader} key={link.item} to={link.link}>
          {link.item}
        </NavLink>
      );
    })
  );
}

export default FooterNav;
