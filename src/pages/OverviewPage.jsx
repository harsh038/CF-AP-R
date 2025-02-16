import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import vw from "/vectorWhite.svg";

const OverviewPage = () => {
  // State to track cursor position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Update state on mouse move
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex-1 relative z-10 overflow-hidden">
      {/* Fixed Header */}
      <div className="relative z-50">
        <Header title="College Finder Admin Dashboard" />
      </div>

      <main className="h-screen flex justify-center items-center relative bg-[#071c39]">
        {/* Animated Gradient following Cursor (Behind All Elements) */}
        <div
          style={{
            width: "150px", // Smaller Size
            height: "150px",
            filter: "blur(50px)",
            backgroundImage:
              "linear-gradient(hsl(222, 84%, 60%), hsl(164, 79%, 71%))",
            borderRadius: "50%", // Smooth rounded shape
            position: "absolute",
            left: position.x - 75 + "px", // Adjust to center on cursor
            top: position.y - 75 + "px",
            transition: "transform 0.1s ease-out", // Smooth follow effect
            pointerEvents: "none", // Avoid blocking clicks
            zIndex: 0, // Keep it behind everything
          }}
        ></div>

        {/* Coming Soon Text */}
        <div className="">
          <div className="flex justify-center">
            <img className="size-36" src={vw} alt="" />
            <div className="m-5">
              <h3 className="text-6xl font-extrabold">College Finder</h3>
              <p className="p-2 font-extralighty text-gray-400">
                World's No. 1 College Finding Application on the Internet
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
