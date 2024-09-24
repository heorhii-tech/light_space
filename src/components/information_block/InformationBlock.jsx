import React from "react";
import InformationCard from "./InformationCard";
import SubTitle from "../common/texts/SubTitle";

function InformationBlock({ data, className, classNameCard, subTitle }) {
  return (
    <div className={className}>
      <SubTitle text={subTitle} />
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
