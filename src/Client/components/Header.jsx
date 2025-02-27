import React, { useState, useEffect } from "react";
import vectorBlack from "../../assets/vectorBlack.svg";
import Login from "../../Forms/Login";
import Register from "../../Forms/Register";
import ProfileDropdown from "../../Client/components/ProfileDropdown";

const Header = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <header
        className={`fixed z-50 left-0 top-0 w-full transition-colors ${
          isScrolled ? "backdrop-blur-2xl bg-white opacity-90" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 px-16 text-goray">
          {/* Logo */}
          <div className="flex justify-start items-center">
            <img className="h-6 w-10" src={vectorBlack} alt="Logo" />
            <p className="text-lg font-medium">College Finder</p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-10">
              <li>
                <a href="#enterprise">Explore</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#pricing">About</a>
              </li>
              <li>
                <a href="#faq">Contact</a>
              </li>
            </ul>
          </nav>

          {/* Profile Section */}
          <div className="flex gap-3">
            {isLoggedIn ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <button
                onClick={() => {
                  setShowLoginPopup(true);
                  setShowRegisterPopup(false);
                }}
                className="bg-gray-800 px-4 py-2 rounded-3xl text-amber-50"
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Popup Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="relative bg-goray p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-700"
            >
              ✖
            </button>
            <Login
              onSuccess={(userData) => {
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                setIsLoggedIn(true);
                setShowLoginPopup(false);
              }}
            />
            {/* Switch to Register */}
            <p className="mt-3 text-center text-gray-300">
              Don't have an account?{" "}
              <button
                className="text-blue-400 underline"
                onClick={() => {
                  setShowLoginPopup(false);
                  setShowRegisterPopup(true);
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Register Popup Modal */}
      {showRegisterPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="relative bg-goray p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={() => setShowRegisterPopup(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-700"
            >
              ✖
            </button>
            <Register
              onSuccess={() => {
                setShowRegisterPopup(false); // Close register popup
                setShowLoginPopup(true); // Open login popup
              }}
            />
            {/* Switch to Login */}
            <p className="mt-3 text-center text-gray-300">
              Already have an account?{" "}
              <button
                className="text-blue-400 underline"
                onClick={() => {
                  setShowRegisterPopup(false);
                  setShowLoginPopup(true);
                }}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
