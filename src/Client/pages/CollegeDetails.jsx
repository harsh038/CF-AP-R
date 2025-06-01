import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoveLeft, Globe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const CollegeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const collegeId = location.state?.collegeId;
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      if (!collegeId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5050/api/College/${collegeId}`
        );
        if (!response.ok) {
          throw new Error("College not found");
        }
        const data = await response.json();
        setCollege(data);
      } catch (error) {
        toast.error("Failed to load college details");
        console.error("Error fetching college:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [collegeId]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-soky pt-28 p-10">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!college) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-soky pt-28 p-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              College Not Found
            </h2>
            <button
              onClick={() => navigate("/filter")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MoveLeft className="h-4 w-4" />
              Back to Search
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-soky pt-28 p-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/filter")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
          >
            <MoveLeft className="h-4 w-4" />
            Back to Search
          </button>

          {/* College Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {college.name}
              </h1>
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Globe className="h-4 w-4" />
                Visit Website
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Type
                </h3>
                <p className="text-gray-800">{college.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Established
                </h3>
                <p className="text-gray-800">{college.establishmentYear}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Location
                </h3>
                <p className="text-gray-800">
                  {college.cityModel?.name || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Address
                </h3>
                <p className="text-gray-800">{college.address}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                About
              </h3>
              <p className="text-gray-800 whitespace-pre-line">
                {college.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollegeDetails;
