import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const AutoRedirect = ({ to, delay }) => {
  const [redirect, setRedirect] = React.useState(false);
  console.log(11);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return redirect ? <Navigate to={to} replace /> : null;
};

export default AutoRedirect;
