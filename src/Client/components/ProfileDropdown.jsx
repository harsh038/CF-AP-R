import { MoveUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    navigate("/");
  };

  return (
    <div className="relative">
      <div
        className="h-10 w-10 flex items-center justify-center bg-goray text-white font-bold rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user?.firstName?.charAt(0).toUpperCase()}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-goray shadow-lg rounded-md z-20">
          <ul className="px-4 pb-2">
            <li className="px-4 py-2 text-white font-medium">
              <h3>Welcome, {user.firstName + " " + user.lastName + " !"}</h3>
            </li>
            <li className="px-4 py-2 text-white font-medium">{user.email}</li>

            {user.role.toLowerCase() === "admin" && (
              <li>
                <button
                  onClick={() => navigate("/admin")}
                  className="flex items-center justify-center w-full  bg-blue-500 rounded-2xl hover:bg-blue-600"
                >
                  <h3 className="ps-4 pr-1 py-2  text-white text-center">
                    Admin Panel
                  </h3>
                  <MoveUpRight color="white" size={16} className="" />
                </button>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 my-2 text-white text-center bg-red-500 rounded-2xl hover:bg-red-600"
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
