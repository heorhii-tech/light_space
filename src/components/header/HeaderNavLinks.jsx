import React from "react";
import { Link, NavLink } from "react-router-dom";

function HeaderNavLinks({ headerMenu }) {
  return (
    <div className="header_links_wrapper">
      {headerMenu &&
        headerMenu.map((item, index) => {
          return (
            <NavLink key={index} to={item.link}>
              {item.item}
            </NavLink>
          );
        })}
    </div>
  );
}

export default HeaderNavLinks;
