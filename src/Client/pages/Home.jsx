import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { MoveRight, MoveUpRight } from "lucide-react";
import Footer from "../components/Footer";
import ShowDataCard from "../components/ShowDataCard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-soky lg:p-10 sm:p-2 md:p-4">
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
            <button
              onClick={() => navigate("/filter")}
              className="flex items-center bg-goray rounded-2xl shadow-2xl px-3 py-2 text-white hover:bg-gray-700"
            >
              View Colleges
              <div className="pl-1">
                <MoveUpRight color="white" size={16} className="" />
              </div>
            </button>
            <button
              onClick={() => navigate("/filter")}
              className="hover:border-s hover:border-t flex items-center bg-sky-100 shadow-2xl rounded-2xl px-3 py-2 text-goray"
            >
              Filter Now
              <div className="pl-2">
                <MoveRight color="black" size={18} className="" />
              </div>
            </button>
          </div>
          <div className="relative flex w-full justify-center items-center mt-2 overflow-x-hidden h-50 bg-soky text-goray">
            <ShowDataCard number={"338 +"} text={"Branches"} />
            <ShowDataCard number={"80 +"} text={"Courses"} />
            <ShowDataCard number={"3,000 +"} text={"Colleges"} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
