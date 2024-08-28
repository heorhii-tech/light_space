import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import useLayout from "../../hooks/useLayout";

const Layout = ({ children }) => {
  const { image, title, button } = useLayout();

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
