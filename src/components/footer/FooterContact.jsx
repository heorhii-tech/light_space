import React from "react";
import { Link } from "react-router-dom";

function FooterContact({ addres, tel }) {
  return (
    <>
      <p>{addres}</p>
      <a href={`tel:${tel}`}>{tel}</a>
    </>
  );
}

export default FooterContact;
