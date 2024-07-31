import React from "react";

function Icon({ setBurgerMenu, burgerOpen }) {
  return (
    <div
      className={
        burgerOpen ? `burger_menu_icon_close` : `burger_menu_icon_open`
      }
      onClick={setBurgerMenu}
    >
      <span className="line1"></span>
      <span className="line2"></span>
    </div>
  );
}

export default Icon;
