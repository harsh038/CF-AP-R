import React from "react";
import Header from "../components/Header";
import { MoveRight, MoveUpRight } from "lucide-react";
import Footer from "../components/Footer";
import ShowDataCard from "../components/ShowDataCard";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="h-dvh bg-soky lg:p-10 sm:p-2 md:p-4 ">
        <div className="pt-36">
          <div className="flex justify-center py-5">
            <p className="text-goray py-1 px-3 rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl border border-blue-950 opacity-80">
              No.1 website to search colleges
            </p>
          </div>

          <h1 className="text-6xl font-bold text-goray flex justify-center pt-6">
            Explore Top Colleges &
          </h1>
          <h1 className="text-6xl font-bold text-goray flex justify-center pt-4">
            Secure Your Future!
          </h1>
          <div className="flex justify-center gap-5 my-18 items-center">
            <button className="flex items-center bg-goray rounded-2xl shadow-2xl px-3 py-2 text-white hover:bg-gray-700">
              View Colleges
              <div className="pl-1">
                <MoveUpRight color="white" size={16} className="" />
              </div>
            </button>
            <button className="   hover:border-s hover:border-t  flex items-center  bg-sky-100 shadow-2xl  rounded-2xl px-3 py-2 text-goray  ">
              Filter Now
              <div className="pl-2">
                <MoveRight color="black" size={18} className="" />
              </div>
            </button>
          </div>
          <div className="relative flex  w-full justify-center items-center mt-2 overflow-x-hidden h-50  bg-soky text-goray">
            <ShowDataCard number={"10,000 +"} text={"Colleges"} />
            <ShowDataCard number={"15,000 +"} text={"Courses"} />
            <ShowDataCard number={"5,000 +"} text={"Colleges"} />
          </div>
        </div>
      </div>
      <div className="w-full h-100 flex  bg-bolue pt-50 "></div>
      <div className="mt-12 w-full flex gap-12">
        <div className="bg-white h-50 w-80"></div>
        <div className="bg-white h-50 w-80"></div>
        <div className="bg-white h-50 w-80"></div>
        <div className="bg-white h-50 w-80"></div>
        <div className="bg-white h-50 w-80"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
