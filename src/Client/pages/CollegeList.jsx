import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, CalendarDays, Globe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/College");
        if (!res.ok) throw new Error("Failed to fetch colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Unable to load colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const totalPages = Math.ceil(colleges.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentColleges = colleges.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-soky pt-28 p-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          Explore Colleges
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentColleges.map((college) => (
                <div
                  key={college.collegeID}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                      {college.name}
                    </h3>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {college.type || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{college.cityModel?.name || "Unknown City"}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <CalendarDays className="w-4 h-4 mr-2 text-purple-600" />
                      <span>
                        Established: {college.establishmentYear || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/collegedetails/${college.collegeID}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>

                    {college.website && (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CollegeList;
