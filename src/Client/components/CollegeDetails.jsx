import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MoveUpRight, ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/College/${id}`);
        if (!response.ok) throw new Error("College not found");
        const data = await response.json();
        setCollege(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error || "College not found"}</p>
        <Link
          to="/filter"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/filter"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Colleges
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {college.collegeName}
                  </h1>
                  <p className="text-gray-600">{college.address}</p>
                  <p className="text-gray-600 mt-1">
                    Established: {college.establishmentYear}
                  </p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Visit Website
                    <MoveUpRight className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Type</p>
                  <p
                    className={`font-medium ${
                      college.collegeType === "Public"
                        ? "text-blue-700"
                        : "text-purple-700"
                    }`}
                  >
                    {college.collegeType}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Available Seats</p>
                  <p className="font-medium text-gray-900">
                    {college.seatsAvailable}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Fee</p>
                  <p className="font-medium text-gray-900">
                    ₹{college.fee?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>

              {college.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    About College
                  </h2>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {college.description}
                  </p>
                </div>
              )}

              {college.admissionCriteria && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Admission Criteria
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600">{college.admissionCriteria}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CollegeDetails;
