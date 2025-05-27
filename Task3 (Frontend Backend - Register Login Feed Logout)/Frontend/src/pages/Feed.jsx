import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/api/feed")
      .then((response) => {
        console.log("Feed data:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feed:", err);
        setError("Failed to load feed data");
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/api/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  if (data.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        No posts available
      </div>
    );

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {/* Header with Logout Button */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Instagram Feed</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
        {data.map((post, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg w-full">
            {/* Profile Section */}
            <div className="flex items-center p-4">
              <img
                src={post.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h2 className="font-bold text-gray-800">{post.profileName}</h2>
              </div>
            </div>

            {/* Feed Image */}
            <img
              src={post.feedImage}
              alt="Feed"
              className="w-full h-auto object-cover"
            />

            {/* Post Details */}
            <div className="p-4">
              <p className="text-gray-800 mb-2">
                <span className="font-bold">{post.profileName}</span>{" "}
                {post.caption}
              </p>
              <div className="text-gray-600 text-sm">
                <p>{post.likes} likes</p>
                <p>{post.comments} comments</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
