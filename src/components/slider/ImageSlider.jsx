// src/Slider.js
import React, { useState } from "react";
import InfoCard from "../info_card/InfoCard";

const Slider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 2;

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? Math.max(0, data.length - itemsToShow) : prevIndex - 2
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= data.length - itemsToShow ? 0 : prevIndex + 2
    );
  };

  return (
    <div className="slider">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {data.map((item, index) => (
          <div className="slide" key={index}>
            <InfoCard
              hashtag={item.hashtag}
              text={item.text}
              path={item.path}
            />
          </div>
        ))}
      </div>
      <button className="prev" onClick={goToPreviousSlide}>
        &#10094;
      </button>
      <button className="next" onClick={goToNextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
