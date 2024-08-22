// src/Slider.js
import React, { useState } from "react";
import InfoCard from "../info_card/InfoCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ data }) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div className="slider_wrapper">
      <div className="slider">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className="slide" key={index}>
              <InfoCard
                hashtag={item.hashtag}
                text={item.text}
                path={item.path}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
