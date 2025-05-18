import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (user.username === "" || user.email === "") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        {user.username ? (
          <div className="text-center">
            <p className="text-lg mb-2">
              Hello, <span className="font-bold">{user.username}</span>!
            </p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
