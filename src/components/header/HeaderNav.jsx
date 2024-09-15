import React, { useState } from "react";
import BurgerMenu from "../burger_menu/BurgerMenu";
import { burgerMenu, headerMenu } from "../../constants/constants";
import Icon from "../burger_menu/Icon";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderAuth from "./HeaderAuth";
import HeaderNavLinks from "./HeaderNavLinks";

function HeaderNav({
  logo,
  filterHeaderMenuFunction,
  showHeader,
  pathImgHeaderAuth,
  linkHeaderAuth,
  funcHeaderAuth,
  classNameHeaderAuth,
  customStyleHeader,
}) {
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

  const filteredBurgerMenu = filterHeaderMenuFunction(burgerMenu, user.token);

  return (
    <div
      className={`header_nav_wrapper ${
        customStyleHeader ? `add_style_header` : ``
      }`}
    >
      <Link to="/" className="logo_wrapper">
        <img className="logo" src={logo}></img>
      </Link>
      <HeaderNavLinks headerMenu={headerMenu} />
      <HeaderAuth
        linkHeaderAuth={linkHeaderAuth}
        funcHeaderAuth={funcHeaderAuth}
        pathImgHeaderAuth={pathImgHeaderAuth}
        classNameHeaderAuth={classNameHeaderAuth}
      />

      <Icon burgerOpen={burgerOpen} setBurgerMenu={setBurgerMenu} />
      {burgerOpen && (
        <BurgerMenu
          headerMenu={filteredBurgerMenu}
          setBurgerMenu={setBurgerMenu}
        />
      )}
    </div>
  );
}

export default HeaderNav;
