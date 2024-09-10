import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import HeaderNav from "./HeaderNav";
import logo from "../../assets/logo.png";
import useHeader from "../../hooks/useHeader";
import useMyAcc from "../../hooks/useMyAcc";
import AvatarLoader from "../skeletons/AvatarLoader";

function Header(props) {
  const { showHeader, filterHeaderMenuFunction, headerAuthLink, pathImg } =
    useHeader();
  const { handleUnLogin } = useMyAcc();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = props.image;
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, [props.image]);
  useEffect(() => {
    setIsImageLoaded(false);
  }, [location.pathname]);

  return (
    <>
      <HeaderNav
        logo={logo}
        filterHeaderMenuFunction={filterHeaderMenuFunction}
        showHeader={showHeader}
        linkHeaderAuth={headerAuthLink}
        funcHeaderAuth={handleUnLogin}
        pathImgHeaderAuth={pathImg}
        classNameHeaderAuth={`header_autth_icon`}
      />
      <header
        style={
          props.nav
            ? { backgroundImage: isImageLoaded ? `url(${props.image})` : "" }
            : { backgroundImage: isImageLoaded ? `url(${props.image})` : "" }
        }
        className={`${showHeader ? "" : "hidde"} ${
          !isImageLoaded ? "skeleton-background" : ""
        }`}
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
