import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("images");

  // Dummy data
  const profile = {
    image: "https://randomuser.me/api/portraits/men/32.jpg", // More realistic profile image
    username: "John Doe",
    email: "johndoe@example.com",
  };

  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", // Landscape
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", // Car
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", // Food
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", // Food
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", // Pet
    "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", // Architecture
  ];

  const documents = [
    "Project_Report.pdf",
    "Financial_Statement.pdf",
    "User_Manual.pdf",
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          My Dashboard
        </h2>

        {/* Profile Section */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center mb-8 transition-all hover:shadow-2xl">
          <div className="relative mb-4 md:mb-0">
            <img
              src={profile.image}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
          </div>
          <div className="md:ml-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">
              {profile.username}
            </h3>
            <p className="text-gray-600">{profile.email}</p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                Pro User
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Designer
              </span>
            </div>
          </div>
          <div className="ml-auto hidden md:flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tab Section */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("images")}
              className={`flex-1 py-4 text-center transition-all ${
                activeTab === "images"
                  ? "border-b-2 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex-1 py-4 text-center transition-all ${
                activeTab === "documents"
                  ? "border-b-2 border-indigo-500 text-indigo-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Documents
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {activeTab === "images" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800">
                    My Gallery
                  </h4>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    Upload New
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
                    >
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 w-full">
                          <p className="text-white font-medium">
                            Image {index + 1}
                          </p>
                          <div className="flex justify-between mt-2">
                            <button className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded hover:bg-white/30 transition-colors">
                              View
                            </button>
                            <button className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded hover:bg-white/30 transition-colors">
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "documents" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800">
                    My Documents
                  </h4>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                    Upload New
                  </button>
                </div>
                <ul className="space-y-3">
                  {documents.map((doc, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 flex items-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{doc}</h5>
                        <p className="text-sm text-gray-500">
                          Added on {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
