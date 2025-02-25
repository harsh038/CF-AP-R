import React, { useState, useEffect } from "react";
import vectorBlack from "../../assets/vectorBlack.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-[100] left-0 top-0 w-full transition-colors ${
        isScrolled ? "backdrop-blur-2xl bg-white mx-10 opacity-90" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-start py-3 px-16">
        <div className="flex justify-start items-center">
          <img className="h-6 w-10" src={vectorBlack} alt="Logo" />
          <p className="text-lg font-medium">College Finder</p>
        </div>
        <div className="mx-auto">
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
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-800 px-4 py-2 rounded-3xl text-amber-50">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
