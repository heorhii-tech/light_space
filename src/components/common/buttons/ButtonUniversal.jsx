import React from "react";

function ButtonUniversal({ className, title, func, type }) {
  return (
    <button type={type} onClick={func} className={className}>
      {title}
    </button>
  );
}

export default ButtonUniversal;
