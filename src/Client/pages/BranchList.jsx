import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5050/api/Branch", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or error fetching branches");
        return res.json();
      })
      .then((data) => setBranches(data))
      .catch((err) => {
        console.error("Error:", err);
        setError("Unable to load branches");
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBranches = branches.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-soky pt-28 p-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          Explore Branches
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentBranches.map((branch) => (
                <Link
                  to={`/branch/${branch.branchID}`}
                  key={branch.branchID}
                  className="bg-slate-950 rounded-2xl shadow-xl p-6 border border-slate-700 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="text-green-400" size={22} />
                      <h3 className="text-lg font-semibold text-white">
                        {branch.branchName}
                      </h3>
                    </div>
                    <span className="text-sm bg-green-800 text-white px-3 py-1 rounded-full">
                      {branch.courseModel?.name || "N/A"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                    {branch.about || "No description available."}
                  </p>
                </Link>
              ))}
            </div>

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
    </>
  );
};

export default BranchList;
