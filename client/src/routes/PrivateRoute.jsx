import React from "react";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { login } from "../redux/authReducer/action";

function PrivateRoute({ children }) {
  //   const auth = useSelector((store) => store.authReducer.isAuth);
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = JSON.parse(localStorage.getItem("userInfo"));
  dispatch(login(auth));

//   console.log(auth, "in private route");

  if (!auth) {
    return <Navigate state={location.pathname} to={"/"} replace={true} />;
  }
  return children;
}

export default PrivateRoute;
