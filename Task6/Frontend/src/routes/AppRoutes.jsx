import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
