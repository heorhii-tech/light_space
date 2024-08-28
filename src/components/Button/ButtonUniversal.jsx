import React from "react";

function ButtonUniversal({ className, title, func }) {
  return (
    <button onClick={func} className={className}>
      {title}
    </button>
  );
}

export default ButtonUniversal;
