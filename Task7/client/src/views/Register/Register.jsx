import { useState } from "react";
import axiosInstance from "../../utiles/Axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    try {
      await axiosInstance.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/login");
      setUsername("");
      setEmail("");
      setPassword("");
      setProfilePhoto(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="file"
          name="profilePhoto"
          accept="image/*"
          className="w-full"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
