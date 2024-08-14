import React, { useState } from "react";
import BurgerMenu from "../burger_menu/BurgerMenu";
import { headerMenu } from "../../constants/constants";
import Icon from "../burger_menu/Icon";
import { useSelector } from "react-redux";

function HeaderNav({ logo, filterHeaderMenuFunction }) {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const setBurgerMenu = () => {
    if (burgerOpen) {
      document.body.style.overflow = "auto";
      setBurgerOpen(false);
    } else if (!burgerOpen) {
      document.body.style.overflow = "hidden";
      setBurgerOpen(true);
    }
  };

  const filteredHeaderMenu = filterHeaderMenuFunction(headerMenu, user.token);

  return (
    <div className="header_nav_wrapper">
      <div className="logo_wrapper">
        <img className="logo" src={logo}></img>
      </div>
      <Icon burgerOpen={burgerOpen} setBurgerMenu={setBurgerMenu} />
      {burgerOpen && (
        <BurgerMenu
          headerMenu={filteredHeaderMenu}
          setBurgerMenu={setBurgerMenu}
        />
      )}
    </div>
  );
}

export default HeaderNav;
