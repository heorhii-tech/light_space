import React from "react";
import TextBlock from "../components/text_block/TextBlock";

import useHomaPage from "../hooks/useHomePage";
import ImageSlider from "../components/slider/ImageSlider";
import Title from "../components/common/texts/Title";

import PrimaryButton from "../components/common/buttons/PrimaryButton";
import FeedBackForm from "../components/forms/reviews_form/FeedBackForm";

function HomePage(props) {
  const { homePageText, infoCards, handleReviewSubmit } = useHomaPage();
  return (
    <section className="home-page">
      <div className="home-page__wrapper">
        <Title
          text={`We know what you need – light, internet, and space for productive work.`}
        />
        <div className="home-page__info">
          <div className="home-page__info-content">
            <TextBlock data={homePageText} />
            <PrimaryButton text={`BOOK`} link={`/reservation`} />
          </div>
          <ImageSlider data={infoCards} />
          <PrimaryButton text={`BOOK`} link={`/reservation`} />
        </div>
        <div className="home-page__feedback_wrapper">
          <Title text={`SEND US A MESSAGE`} />
          <FeedBackForm
            handleReviewSubmit={handleReviewSubmit}
            className={`home-page__review_form`}
          />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
