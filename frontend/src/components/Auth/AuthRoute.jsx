import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const AuthRoute = ({ children }) => {
  const token = getUserFromStorage();

  if (token) {
    return children;
  } else {
    return <Navigate to="/quizzes/login" />;
  }
};

export default AuthRoute;