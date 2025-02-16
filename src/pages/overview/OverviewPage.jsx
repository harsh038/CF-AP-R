import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import vectorWhite from "/vectorWhite.svg";

const OverviewPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex-1 relative z-10 overflow-hidden">
      <div className="relative z-50">
        <Header title="Dashboard" />
      </div>

      <main className="h-screen flex justify-center items-center relative bg-gray-900">
        <div
          style={{
            width: "150px",
            filter: "blur(50px)",
            backgroundImage:
              "linear-gradient(hsl(222, 84%, 60%), hsl(164, 79%, 71%))",
            borderRadius: "50%",
            position: "absolute",
            left: position.x - 75 + "px",
            top: position.y - 75 + "px",
            transition: "transform 0.1s ease-out",
            pointerEvents: "none",
            zIndex: 0,
          }}
        ></div>

        <div className="">
          <div className="flex justify-center">
            <img className="size-36" src={vectorWhite} alt="" />
            <div className="m-5">
              <h3 className="text-6xl font-extrabold">College Finder</h3>
              <p className="p-2 font-extralighty text-gray-400">
                World's No. 1 College Finding Website on the Internet
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
