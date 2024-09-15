import React from "react";
import TextBlock from "../components/text_block/TextBlock";
import useAboutUs from "../hooks/useAboutUs";
import ImageSlider from "../components/slider/ImageSlider";
import PrimaryButton from "../components/common/buttons/PrimaryButton";
import InformationBlock from "../components/information_block/InformationBlock";
import { valuesData, homePageText } from "../constants/constants";
import Title from "../components/common/texts/Title";

function AboutUsPage(props) {
  const { aboutUsPageText, infoCards } = useAboutUs();
  return (
    <section className="about-us">
      <div className="about-us__wrapper">
        <Title
          text={`We are a young team of professionals engaged in the development and management of Svitlo Space`}
        />
        <div className="about-us__info">
          <TextBlock data={aboutUsPageText} />
          <ImageSlider data={infoCards} />
          <PrimaryButton text={`BOOK`} link={`/reservation`} />
        </div>
        <Title text={`Our values`} />
        <InformationBlock
          data={valuesData}
          className={`our_values_wrapper`}
          classNameCard={`values_card`}
        />
      </div>
    </section>
  );
}

export default AboutUsPage;
