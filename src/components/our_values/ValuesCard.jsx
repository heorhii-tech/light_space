import React from "react";

function ValuesCard({ img, text, bgColor, color }) {
  return (
    <div
      className="values_card"
      style={{ backgroundColor: bgColor, color: color }}
    >
      <img src={img} />
      <p>{text}</p>
    </div>
  );
}

export default ValuesCard;
