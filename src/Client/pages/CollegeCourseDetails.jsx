import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const CollegeCourseDetails = () => {
  const { collegeCourseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const collegeData = location.state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [branchName, setBranchName] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const courseResponse = await fetch(
          `http://localhost:5050/api/Course/${collegeData.courseID}`,
          { headers }
        );
        const courseData = await courseResponse.json();
        setCourseName(courseData.name || courseData.courseName);

        const branchResponse = await fetch(
          `http://localhost:5050/api/Branch/${collegeData.branchID}`,
          { headers }
        );
        const branchData = await branchResponse.json();
        setBranchName(branchData.name || branchData.branchName);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Error loading course details");
      } finally {
        setLoading(false);
      }
    };

    if (collegeData) {
      fetchDetails();
    }
  }, [collegeData]);

  if (!collegeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">
          College details not found
        </div>
        <button
          onClick={() => navigate("/filter")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MoveLeft className="h-4 w-4" />
          Back to Search
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate("/filter")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MoveLeft className="h-4 w-4" />
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/filter")}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
      >
        <MoveLeft className="h-4 w-4" />
        Back to Search
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">{collegeData.collegeName}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            <span
              className={`px-2 py-1 rounded-full ${collegeData.collegeType === "Private"
                ? "bg-purple-200 text-purple-800"
                : "bg-green-200 text-green-800"
                }`}
            >
              {collegeData.collegeType}
            </span>
            <span>•</span>
            <span>Est. {collegeData.establishmentYear}</span>
          </div>
        </div>

        <div className="p-8 grid gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                College Information
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-500">Address:</span>
                  <br />
                  {collegeData.address}
                </p>
                {collegeData.website && (
                  <p>
                    <span className="text-gray-500">Website:</span>
                    <br />
                    <a
                      href={collegeData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {collegeData.website}
                    </a>
                  </p>
                )}
                {collegeData.description && (
                  <p>
                    <span className="text-gray-500">Description:</span>
                    <br />
                    {collegeData.description}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Course Details</h2>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-500">Course:</span>
                  <br />
                  {courseName || `Course ID: ${collegeData.courseID}`}
                </p>
                <p>
                  <span className="text-gray-500">Branch:</span>
                  <br />
                  {branchName || `Branch ID: ${collegeData.branchID}`}
                </p>
                <p>
                  <span className="text-gray-500">Available Seats:</span>
                  <br />
                  {collegeData.seatsAvailable}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Admission Details</h2>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-500">Admission Criteria:</span>
                  <br />
                  {collegeData.admissionCriteria}
                </p>
                <p>
                  <span className="text-gray-500">College Course ID:</span>
                  <br />
                  {collegeData.collegeCourseID}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Fee Details</h2>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-500">Course Fee:</span>
                  <br />₹{collegeData.fee}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <p>
                <span className="text-gray-500">City ID:</span>
                <br />
                {collegeData.cityID}
              </p>
              <p>
                <span className="text-gray-500">State ID:</span>
                <br />
                {collegeData.stateID || "Not specified"}
              </p>
              <p>
                <span className="text-gray-500">Country ID:</span>
                <br />
                {collegeData.countryID || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCourseDetails;
