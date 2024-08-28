import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RedirectIfAuthenticated({ children }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (user.token) {
    // Если пользователь авторизован, перенаправляем на главную страницу или другую защищенную страницу
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Если пользователь не авторизован, рендерим дочерние элементы (страницу входа)
  return children;
}

export default RedirectIfAuthenticated;
