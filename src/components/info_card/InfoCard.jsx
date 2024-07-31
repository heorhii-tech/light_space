import React from "react";

function InfoCard({ hashtag, text, path }) {
  return (
    <div className="info_card">
      <h6>{hashtag}</h6>
      <p>{text}</p>
      <img src={path} />
    </div>
  );
}

export default InfoCard;
