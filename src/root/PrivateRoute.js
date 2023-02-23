import React from "react";
import { Navigate } from "react-router-dom";
import WithLayout from "../HOC/WithLayout";
import { LOGIN_PATH } from "./routeConstants";

const PrivateRoute = ({ route }) => {
    const authToken = localStorage.getItem("token");
    React.useEffect(() => {
      if (!authToken) {
        alert("You have not logged in!");
        window.location.href = LOGIN_PATH;
      }
    }, [authToken]);
  
    return authToken ? (
      WithLayout(route.element, route.isHeader)
    ) : (
      <Navigate to={LOGIN_PATH} />
    );
  };
  
  export default PrivateRoute;