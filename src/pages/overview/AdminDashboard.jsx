import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 relative w-full h-dvh ">
      {" "}
      {/* Add relative positioning */}
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h2>
      <p className="text-gray-300">Email: {user.email}</p>
      <p className="text-gray-300">Role: {user.role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 z-10" // Add z-10
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
