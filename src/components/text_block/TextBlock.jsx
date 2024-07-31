import React from "react";

function TextBlock({ data }) {
  return (
    <div className="text_block_wrapper">
      <h3 className="text_block_title">{data[0].title}</h3>
      <div className="text_block_text_wrapper">
        {data[1].text.map((item, index) => {
          return (
            <p className="text_block_text" key={index}>
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default TextBlock;
