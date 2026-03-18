import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes.js";
import { NEWS_ROUTE } from "../utils/consts.js";
import RequireAuth from "./RequireAuth.js";

const AppRouter = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={
          <RequireAuth>{element}</RequireAuth>
        } />
      ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={NEWS_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
