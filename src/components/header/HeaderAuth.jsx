import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function HeaderAuth({
  pathImgHeaderAuth,
  linkHeaderAuth,
  funcHeaderAuth,
  classNameHeaderAuth,
}) {
  return (
    <Button
      className="header_auth_icon"
      variant="text"
      component={Link} // Используем MUI Button с роутером Link
      to={linkHeaderAuth}
      onClick={funcHeaderAuth}
      sx={{
        marginLeft: {
          xs: "auto",
          sm: 0,
        },
        backgroundColor: "transparent",
        ...(window.innerWidth > 768 && {
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          },
        }),
      }}
    >
      <img
        style={{ maxWidth: "40px" }}
        src={pathImgHeaderAuth}
        alt="auth icon"
      />
    </Button>
  );
}

export default HeaderAuth;
