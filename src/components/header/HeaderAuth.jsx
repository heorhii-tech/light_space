import React from "react";
import { Link } from "react-router-dom";

function HeaderAuth({
  pathImgHeaderAuth,
  linkHeaderAuth,
  funcHeaderAuth,
  classNameHeaderAuth,
}) {
  return (
    <div className={classNameHeaderAuth} onClick={funcHeaderAuth}>
      <Link to={linkHeaderAuth}>
        <img src={pathImgHeaderAuth} />
      </Link>
    </div>
  );
}

export default HeaderAuth;
