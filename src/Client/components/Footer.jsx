import React from "react";
import vectorWhite from "../../assets/vectorWhite.svg";
import Facebook from "../../assets/Facebook.svg";
import instagram from "../../assets/instagram.svg";
import LinkedIn from "../../assets/LinkedIn.svg";
import x from "../../assets/X.svg";

const Footer = () => {
  return (
    <div className="relative w-full h-100 pt-15 mt-3">
      <div className="flex mx-1 p-10 h-full rounded-2xl bg-goray">
        <div className="flex-[2]  text-white">
          <div className=" flex justify-start items-center gap-3">
            <img className="w-10 h-10" src={vectorWhite} alt="logo" />
            <h3 className="text-2xl">College Finder</h3>
          </div>
          <div className="text-gray-400 mt-5 ">
            Amarnagar Road, Near Sardar Chowk,
            <br />
            Jetpur, Rajkot - 360370, <br />
            Gujarat, India
          </div>
          <div className="flex justify-start gap-5 mt-4 opacity-90">
            <img className="h-8 w-8 rounded-full" src={Facebook} alt="f" />
            <img className="h-8 w-8 rounded-full" src={x} alt="f" />
            <img className="h-8 w-8 rounded-full" src={LinkedIn} alt="f" />
            <img className="h-8 w-8 rounded-full" src={instagram} alt="f" />
          </div>
        </div>

        <div className="flex-[1.5] text-white ">
          <div className="grid grid-rows-4 place-items-start gap-3">
            <h3 className="text-md">Colleges by Courses</h3>
            <div className="text-sm text-gray-300">
              Engineering Colleges in India
            </div>
            <div className="text-sm text-gray-300">
              Top MBA/PGDM Colleges in India
            </div>
            <div className="text-sm text-gray-300">
              Top MCA Colleges in India
            </div>
            <div className="text-sm text-gray-300">
              Top BCA Colleges in India
            </div>
            <div className="text-sm text-gray-300">
              Top BBA Colleges in India
            </div>
            <div className="text-sm text-gray-300">
              Top Msc Colleges in India
            </div>
            <div className="text-sm text-gray-300">
              Top Bsc Colleges in India
            </div>
          </div>
        </div>
        <div className="flex-[1] text-white ">
          <div className="grid grid-rows-4 place-items-start gap-3">
            <h3 className="text-md ">Top Courses</h3>
            <div className="text-sm text-gray-300">BTech</div>
            <div className="text-sm text-gray-300">BCOM</div>
            <div className="text-sm text-gray-300">BBA</div>
            <div className="text-sm text-gray-300">BSc</div>
            <div className="text-sm text-gray-300">BCA</div>
            <div className="text-sm text-gray-300">MBA</div>
            <div className="text-sm text-gray-300">MCA</div>
          </div>
        </div>
        <div className="flex-[1] text-white ">
          <div className="grid grid-rows-4 place-items-start gap-3">
            <h3 className="text-md">Company</h3>
            <div className="text-sm text-gray-300">BTech</div>
            <div className="text-sm text-gray-300">BCOM</div>
            <div className="text-sm text-gray-300">BBA</div>
            <div className="text-sm text-gray-300">BSc</div>
            <div className="text-sm text-gray-300">MBA</div>
            <div className="text-sm text-gray-300">MCA</div>
          </div>
        </div>
        <div className="flex-[1] text-white ">
          <div className="grid grid-rows-4 place-items-start gap-3">
            <h3 className="text-md">Company</h3>
            <div className="text-sm text-gray-300">Gallery</div>
            <div className="text-sm text-gray-300">Blogs</div>
            <div className="text-sm text-gray-300">About Us</div>
            <div className="text-sm text-gray-300">Contact Us</div>
            <div className="text-sm text-gray-300">Privacy Policy</div>
            <div className="text-sm text-gray-300">Terms & Conditions</div>
          </div>
        </div>
      </div>
      <div className="p-1 bg-black"></div>
    </div>
  );
};

export default Footer;
