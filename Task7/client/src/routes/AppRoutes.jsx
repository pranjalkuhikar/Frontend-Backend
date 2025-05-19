import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Auth from "../utiles/Auth";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
