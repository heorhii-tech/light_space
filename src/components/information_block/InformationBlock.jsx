import React from "react";
import InformationCard from "./InformationCard";
import Title from "../common/texts/Title";

function InformationBlock({ data, className, classNameCard, title }) {
  return (
    <div className={className}>
      <Title text={title} />
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
