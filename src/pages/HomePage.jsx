import React from "react";
import TextBlock from "../components/text_block/TextBlock";

import useHomaPage from "../hooks/useHomePage";
import Slider from "../components/slider/ImageSlider";

function HomePage(props) {
  const { homePageText, infoCards } = useHomaPage();
  return (
    <>
      <TextBlock data={homePageText} />
      <Slider data={infoCards} />
    </>
  );
}

export default HomePage;
