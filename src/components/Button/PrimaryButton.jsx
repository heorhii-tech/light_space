import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const PrimaryButton = (props) => {
  return (
    <Link className="primary-button button" to={props.link}>
      {props.text}
    </Link>
  );
};
export default PrimaryButton;
