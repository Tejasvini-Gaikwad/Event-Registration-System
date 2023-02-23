import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import routesConfig from "./routes-config";

const RoutesComponent = () => {
  const getRoutes = () =>
    routesConfig.map((route) =>
      route.isProtected ? (
        <Route
          path={route.path}
          key={route.key}
          element={<PrivateRoute route={route} />}
        />
      ) : (
        <Route key={route.key} path={route.path} element={route.element} />
      )
    );
  return (
    <BrowserRouter>
      <Routes>
        {getRoutes()}
        <Route path="*" key="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
