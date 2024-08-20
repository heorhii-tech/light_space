import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import HeaderNav from "./HeaderNav";
import logo from "../../assets/logo.png";
import useHeader from "../../hooks/useHeader";

function Header(props) {
  const { showHeader, setShowHeader, filterHeaderMenuFunction } = useHeader();

  return (
    <>
      <HeaderNav
        logo={logo}
        filterHeaderMenuFunction={filterHeaderMenuFunction}
        showHeader={showHeader}
      />
      <header
        style={
          props.nav
            ? { backgroundImage: `url(${props.image})` }
            : { backgroundImage: `url(${props.image})` }
        }
        className={showHeader ? `` : `hidde`}
      >
        <div className={`header`}>
          <div className={`header_main`}>
            <h3>
              {props.title}
              <br />
              {props.titleText}
            </h3>
            <h6>{props.text}</h6>
            {props.button ? (
              <PrimaryButton text={props.button} link={props.buttonLink} />
            ) : null}
            {props.secondaryButton ? (
              <SecondaryButton text={props.secondaryButton} />
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
/*  <Link to={`/`}>Home</Link>
      <Link to={`/reservation`}>Resevation</Link>
      <Link to={`/about`}>About</Link>
      {!user.token && <Link to={`/signup`}>SignUp</Link>}
      {!user.token && <Link to={`/login`}>LogIn</Link>}
      <Link to={`/my_account`}>My account</Link>*/
