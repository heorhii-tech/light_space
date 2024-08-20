import React from "react";
import { Link } from "react-router-dom";
import instagramLogo from "../../assets/Instagram.png";
import facebookLogo from "../../assets/Facebook.png";

function FooterInfo({ logo, addres, tel }) {
  return (
    <div className="footer_info">
      <div className="footer_info_logo">
        <Link to="/">
          <img src={logo} />
        </Link>
        <p>{addres}</p>
        <a href={`tel:${tel}`}>{tel}</a>
      </div>
      <div className="footer_social">
        <a href="/" target="_blanc">
          <img src={instagramLogo} />
        </a>
        <a href="/" target="_blanc">
          <img src={facebookLogo} />
        </a>
      </div>
    </div>
  );
}

export default FooterInfo;
