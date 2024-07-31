import React from "react";
import Header from "../header/Header";
import imageCard1 from "../../assets/image-of-card-1.jpg";
import imageCard2 from "../../assets/image-of-2-card.jpg";
import image from "../../assets/header2.svg";

const Layout = ({ children }) => {
  return (
    <>
      <Header nav={true} button="Book table" buttonLink="/book" image={image} />

      <main>{children}</main>
    </>
  );
};

export default Layout;
