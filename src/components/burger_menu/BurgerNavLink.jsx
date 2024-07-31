import React, { act } from "react";
import { Link } from "react-router-dom";

function BurgerNavLink({ link, action, title }) {
  return (
    <Link onClick={action} to={link}>
      {title && title}
    </Link>
  );
}

export default BurgerNavLink;
