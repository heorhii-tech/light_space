import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";
import useHeader from "../../hooks/useHeader";

export const Logo = ({ logoLink }) => {
  const { scrollToHeader } = useHeader();
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        padding: "0",
        transition: "box-shadow 0.3s ease-in-out",
        ...(window.innerWidth > 768 && {
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          },
        }),
      }}
      component={Link}
      to="/"
      onClick={scrollToHeader}
      className="logo_wrapper"
    >
      <img className="logo" src={logoLink}></img>
    </Button>
  );
};
