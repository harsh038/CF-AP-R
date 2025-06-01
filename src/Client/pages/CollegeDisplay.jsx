import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { GraduationCap, MapPin, CalendarDays } from "lucide-react";

const CollegeDisplay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/College/${id}`);
        if (!res.ok) throw new Error("College not found");
        const data = await res.json();
        setCollege(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load college details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-soky text-white px-6 py-24 md:px-20">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="max-w-1xl mx-auto bg-goray p-10 rounded-md shadow-2xl">
            <div className="flex justify-between text-4xl font-bold text-white mb-8">
              {" "}
              {college.name}
              {college.website && (
                <div>
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-lg hover:text-white"
                  >
                    <button className="text-md font-medium bg-blue-600 hover:border-b-1 rounded-md px-3 py-1 text-white">
                      view site
                    </button>
                  </a>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-white/90">
              <div>
                <p className="text-sm font-medium mb-1 text-white/70">
                  <MapPin className="inline w-4 h-4 mr-1 text-green-400" />
                  Location:
                </p>
                <p className="text-lg font-semibold">
                  {college.cityModel?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1 text-white/70">
                  <GraduationCap className="inline w-4 h-4 mr-1 text-blue-400" />
                  Type:
                </p>
                <p className="text-lg font-semibold">{college.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1 text-white/70">
                  <CalendarDays className="inline w-4 h-4 mr-1 text-purple-400" />
                  Established:
                </p>
                <p className="text-lg font-semibold">
                  {college.establishmentYear}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1 text-white/70">
                  Address:
                </p>
                <p className="text-lg font-semibold">
                  {college.address || "N/A"}
                </p>
              </div>
            </div>

            {college.description && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-2">About the College</h2>
                <p className="text-white/80 leading-relaxed">
                  {college.description}
                </p>
              </div>
            )}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="text-md bg-blue-600 text-white px-4 py-2 rounded-md mt-10 hover:bg-blue-600 hover:border-b-1  transition"
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CollegeDisplay;
