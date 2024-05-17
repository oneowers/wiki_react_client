import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'; // Updated import
import { authRoutes, publicRoutes } from "../routes.js";
import { SHOP_ROUTE } from "../utils/consts.js";
import { Context } from "../index.js";

const AppRouter = () => {
  const {user} = useContext(Context)

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {/* Wrap Navigate in a Route or Fragment */}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
