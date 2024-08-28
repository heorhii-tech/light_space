import React from "react";

function BackArrow({ className, pathImg, func }) {
  return <img className={className} onClick={func} src={pathImg}></img>;
}

export default BackArrow;
