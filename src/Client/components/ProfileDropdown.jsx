import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout(); // Update the Header state
    navigate("/");
  };

  return (
    <div className="relative">
      {/* Profile Icon (Click to Toggle Dropdown) */}
      <div
        className="h-10 w-10 flex items-center justify-center bg-goray text-white font-bold rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user?.firstName?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-70 bg-goray shadow-lg rounded-md z-20">
          <ul className="px-4 pb-2">
            <li className="px-4 py-2 text-white font-medium">
              {user.firstName + " " + user.lastName}
            </li>
            <li className="px-4 py-2 text-white font-medium">{user.email}</li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-2 py-2 mx-2 my-2 text-white text-center bg-red-500 rounded-2xl hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
