import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RedirectIfAuthenticated({ children }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  if (user.token) {
    return (
      <Navigate
        to={location.state?.from?.pathname || "/"}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default RedirectIfAuthenticated;
