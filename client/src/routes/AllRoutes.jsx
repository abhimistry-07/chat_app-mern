import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUp from "../components/SignUp";
import PrivateRoute from "./PrivateRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/chats"
        element={
          <PrivateRoute>
            <h1>Chats Page</h1>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
