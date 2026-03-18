import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { LOGIN_ROUTE } from "../utils/consts.js";

const RequireAuth = observer(({ children }) => {
  const { user } = useContext(Context);

  // Ждём завершения проверки авторизации
  if (user.loading) {
    return null;
  }

  // Если не авторизован — редирект на страницу входа
  if (!user.isAuth) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return children;
});

export default RequireAuth;
