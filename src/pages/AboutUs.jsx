import React from "react";
import TextBlock from "../components/text_block/TextBlock";
import useAboutUs from "../hooks/useAboutUs";
import ImageSlider from "../components/slider/ImageSlider";
import PrimaryButton from "../components/Button/PrimaryButton";
import InformationBlock from "../components/information_block/InformationBlock";
import { valuesData } from "../constants/constants";

function AboutUs(props) {
  const { aboutUsPageText, infoCards } = useAboutUs();
  return (
    <div className="about_us_wrapper">
      <TextBlock data={aboutUsPageText} />
      <ImageSlider data={infoCards} />
      <PrimaryButton text={`BOOK`} link={`/reservation`} />
      <InformationBlock
        data={valuesData}
        className={`our_values_wrapper`}
        classNameCard={`values_card`}
      />
    </div>
  );
}

export default AboutUs;
