import React from "react";
import ValuesCard from "./ValuesCard";

function OurValues({ data }) {
  return (
    <div className="our_values_wrapper">
      {data.map((item, index) => {
        return (
          <ValuesCard
            key={index}
            text={item.text}
            img={item.img}
            bgColor={item.bgColor}
            color={item.color}
          />
        );
      })}
    </div>
  );
}

export default OurValues;
