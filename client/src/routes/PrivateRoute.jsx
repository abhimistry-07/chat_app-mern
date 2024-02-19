import React from "react";
// import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  //   const auth = useSelector((store) => store.authReducer.isAuth);
  const location = useLocation();

  const auth = JSON.parse(localStorage.getItem("userInfo"));

  //   console.log(auth);

  if (!auth) {
    return <Navigate state={location.pathname} to={"/"} replace={true} />;
  }
  return children;
}

export default PrivateRoute;
