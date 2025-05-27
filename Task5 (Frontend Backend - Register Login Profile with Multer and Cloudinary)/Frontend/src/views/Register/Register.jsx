import { useState } from "react";
import axiosInstances from "../../utiles/Axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlerChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large! Max 5MB allowed.");
        return;
      }

      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPG, JPEG, PNG files are allowed.");
        return;
      }

      setProfilePhoto(file);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create FormData object to send file
      const formData = new FormData();
      formData.append("username", formValue.username);
      formData.append("email", formValue.email);
      formData.append("password", formValue.password);

      // Only append file if it exists
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      // Update axios config to handle FormData
      await axiosInstances.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registration successful");

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-6" onSubmit={handlerSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formValue.username}
              onChange={handlerChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValue.email}
              onChange={handlerChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formValue.password}
              onChange={handlerChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label
              htmlFor="profilePhoto"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Photo (Optional)
            </label>
            <input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Register;
