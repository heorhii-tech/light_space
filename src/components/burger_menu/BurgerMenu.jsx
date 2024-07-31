import React from "react";
import BurgerNavLink from "./BurgerNavLink";

function BurgerMenu({ headerMenu, setBurgerMenu }) {
  return (
    <div className="burger_menu">
      <div className="burger_nav_links_wrapper">
        {headerMenu.map((item, index) => {
          return (
            <BurgerNavLink
              key={index}
              action={setBurgerMenu}
              link={item.link}
              title={item.item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BurgerMenu;
