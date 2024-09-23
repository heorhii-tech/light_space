import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const SecondaryButton = ({ link, text }) => {
  return (
    <Link to={link} type="button" className="secondary-button button">
      {text}
    </Link>
  );
};
export default SecondaryButton;
