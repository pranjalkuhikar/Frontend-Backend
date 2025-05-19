import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/user/user.feature";
import axiosInstance from "./Axios";

const Auth = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username !== "" || user.email !== "") {
      return;
    }
    axiosInstance
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
        if (err.response && err.response.status === 401) {
          navigate("/login");
        } else {
          console.error(err);
        }
      });
  }, [user, dispatch, navigate]);

  return children;
};

export default Auth;
