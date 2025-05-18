import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
        {user.username ? (
          <div className="text-center">
            {user.profilePhoto && (
              <div className="mb-4 flex justify-center">
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                />
              </div>
            )}
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
