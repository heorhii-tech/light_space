import React from "react";

function Description({ text }) {
  return (
    <div className="universal_desc_wreapper">
      <h4 className="description">{text}</h4>
    </div>
  );
}

export default Description;
