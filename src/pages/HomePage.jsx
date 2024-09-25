import React, { useEffect } from "react";
import TextBlock from "../components/text_block/TextBlock";

import useHomaPage from "../hooks/useHomePage";
import ImageSlider from "../components/slider/ImageSlider";
import Title from "../components/common/texts/Title";

import PrimaryButton from "../components/common/buttons/PrimaryButton";
import FeedBackForm from "../components/forms/message_form/MessageForm";
import SpinLoader from "../components/common/skeletons/SpinLoader";
import SuccesResult from "../components/common/ant-design_components/SuccessResult";

function HomePage(props) {
  const {
    homePageText,
    infoCards,
    handleReviewSubmit,
    isLoading,
    isModaSuccesslOpen,
    setIsModaSucceslOpen,
  } = useHomaPage();

  return (
    <section className="home-page">
      <div className="home-page__wrapper">
        {isLoading && <SpinLoader />}

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

        {!isModaSuccesslOpen ? (
          <div className="home-page__feedback_wrapper">
            <Title text={`SEND US A MESSAGE`} />
            <FeedBackForm
              handleReviewSubmit={handleReviewSubmit}
              className={`home-page__review_form`}
            />
          </div>
        ) : (
          <SuccesResult
            title={`Successfully sent message`}
            isModalOpen={isModaSuccesslOpen}
            handleCancel={() => setIsModaSucceslOpen(false)}
          />
        )}
      </div>
    </section>
  );
}

export default HomePage;
