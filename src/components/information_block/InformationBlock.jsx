import React from "react";
import InformationCard from "./InformationCard";

function InformationBlock({ data, className, classNameCard }) {
  return (
    <div className={className}>
      {data.map((item, index) => {
        return (
          <InformationCard
            classNameCard={classNameCard}
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

export default InformationBlock;
