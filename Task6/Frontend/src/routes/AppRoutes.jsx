import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
