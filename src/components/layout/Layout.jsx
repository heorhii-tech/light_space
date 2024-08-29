import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import useHeader from "../../hooks/useHeader";

const Layout = ({ children }) => {
  const { image, title, button } = useHeader();

  return (
    <div className="main_wrapper">
      <Header
        nav={true}
        button={button}
        buttonLink="/reservation"
        image={image}
        title={title}
      />

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
