import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GraduationCap } from "lucide-react";

const BranchDisplay = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5050/api/Branch/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching branch");
        return res.json();
      })
      .then((data) => setBranch(data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load branch information.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-soky text-white px-6 py-24 md:px-20">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="max-w-5xl mx-auto bg-goray p-10 rounded-3xl shadow-2xl space-y-10">
            <div>
              <button
                onClick={() => window.history.back()}
                className="text-sm bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                ← Back
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/20 pb-6">
              <div className="flex items-center gap-4">
                <GraduationCap className="text-green-400" size={36} />
                <div>
                  <h1 className="text-3xl font-bold">{branch.branchName}</h1>
                  <p className="text-white/70 text-sm mt-1">
                    Course:{" "}
                    <span className="text-white font-semibold">
                      {branch.courseModel?.name || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-slate-900 p-6 rounded-xl shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">About</h2>
              </div>
              <p className="text-white/80 leading-relaxed">{branch.about}</p>
            </div>

            <div className="space-y-4 bg-slate-900 p-6 rounded-xl shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">Course Structure</h2>
              </div>
              <pre className="whitespace-pre-wrap text-white/80 text-sm leading-relaxed">
                {branch.content}
              </pre>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BranchDisplay;
