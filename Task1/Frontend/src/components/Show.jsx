import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios.js";

const Show = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axiosInstance
      .get("/show") // Replace with your API endpoint
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        User Data
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-32 h-32 rounded-full shadow-md mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {item.name}
            </h2>
            <p className="text-gray-600 text-lg mb-2">Email: {item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Show;
