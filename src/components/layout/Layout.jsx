import React from "react";
import Header from "../header/Header";
import imageCard1 from "../../assets/image-of-card-1.jpg";
import imageCard2 from "../../assets/image-of-2-card.jpg";
import image from "../../assets/header2.svg";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="main_wrapper">
      <Header
        nav={true}
        button="Book table"
        buttonLink="/reservation"
        image={image}
      />

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
