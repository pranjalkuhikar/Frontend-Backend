import React, { useEffect } from "react";
import axiosInstances from "./Axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/users/user.feature";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);

    if (user.username !== "" || user.email !== "") {
      return;
    }

    axiosInstances
      .get("/auth")
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setUser({
              username: res.data.user.username,
              email: res.data.user.email,
              profilePhoto: res.data.user.profilePhoto,
            })
          );
        }
      })
      .catch((err) => {
        console.error("Auth error:", err.response?.data || err.message);
        navigate("/login");
      });
  });

  return children;
};

export default Auth;
