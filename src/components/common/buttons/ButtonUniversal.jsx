import React from "react";

function ButtonUniversal({ className, title, func, func1,type }) {
  return (
    <button
    type={type}
      onClick={() => {
        func();
        func1;
      }}
      className={className}
    >
      {title}
    </button>
  );
}

export default ButtonUniversal;
