import React from "react";
import instagramLogo from "../../assets/Instagram.png";
import facebookLogo from "../../assets/Facebook.png";
import logo from "../../assets/logo.png";
import { tel, addres, headerMenu } from "../../constants/constants";
import { Logo } from "../logo/Logo";
import FooterContact from "./FooterContact";
import FooterSocialMedia from "./FooterSocialMedia";

import { headerMenu as footerMenu } from "../../constants/constants";
import FooterNav from "./FooterNav";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer__contact-info">
          <div className="footer-contact">
            <Logo logoLink={logo} />
            <div className="footer-contact__adress__tel">
              <FooterContact tel={tel} addres={addres} />
            </div>
          </div>
          <div className="footer-contact__social-media">
            <FooterSocialMedia
              logoLink1={instagramLogo}
              logoLink2={facebookLogo}
            />
          </div>
        </div>

        <div className="footer-nav">
          <FooterNav footerMenu={footerMenu} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
