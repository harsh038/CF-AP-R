import React from "react";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to College Finder!</h2>
      <p className="text-gray-300">
        {isAuthenticated
          ? "This is your user homepage."
          : "Please log in to access more features."}
      </p>

      {/* Show Login button if not authenticated */}
      {!isAuthenticated && (
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default UserHomePage;