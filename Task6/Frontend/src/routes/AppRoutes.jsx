import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Auth from "../utiles/Auth.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
        {/* Add a catch-all route that redirects to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
