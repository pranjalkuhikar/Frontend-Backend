import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Welcome</h1>
        <div className="flex gap-5">
          <Link
            to={"/login"}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
