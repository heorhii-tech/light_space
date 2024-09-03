import React from "react";

function InformationCard({ img, text, bgColor, color, classNameCard }) {
  return (
    <div
      className={classNameCard}
      style={{ backgroundColor: bgColor, color: color }}
    >
      <img src={img} />
      <p>{text}</p>
    </div>
  );
}

export default InformationCard;
