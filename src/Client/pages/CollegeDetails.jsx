import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MoveLeft, Globe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const CollegeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const collegeCourseID = location.state?.collegeCourseID;

  const [collegeCourse, setCollegeCourse] = useState(null);
  const [college, setCollege] = useState(null);
  const [branch, setBranch] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!collegeCourseID) {
        setLoading(false);
        return;
      }
      const token = localStorage.getItem("token");
      try {
        const courseResponse = await fetch(
          `http://localhost:5050/api/CollegeCourse/${collegeCourseID}`
        );
        if (!courseResponse.ok) {
          throw new Error("College course not found");
        }
        const courseData = await courseResponse.json();
        setCollegeCourse(courseData);

        const collegeID = courseData.collegeID;
        const collegeResponse = await fetch(
          `http://localhost:5050/api/College/${collegeID}`
        );
        if (!collegeResponse.ok) {
          throw new Error("College not found");
        }
        const collegeData = await collegeResponse.json();
        setCollege(collegeData);

        const branchID = courseData.branchID;
        const branchResponse = await fetch(
          `http://localhost:5050/api/Branch/${branchID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (branchResponse.ok) {
          const branchData = await branchResponse.json();
          console.log("Fetched branch data:", branchData);
          setBranch(branchData);
        }

        const courseID = courseData.courseID;
        const courseDetailsResponse = await fetch(
          `http://localhost:5050/api/Course/${courseID}`
        );
        if (courseDetailsResponse.ok) {
          const courseDetails = await courseDetailsResponse.json();
          setCourse(courseDetails);
        }
      } catch (error) {
        toast.error("Failed to load college details");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [collegeCourseID]);

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

  if (!collegeCourse || !college) {
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify">
              <button
                onClick={() => navigate("/filter")}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors mb-6"
              >
                <MoveLeft className="h-4 w-4" />
                Back to Search
              </button>
            </div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {college.name}
              </h1>
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-blue-50 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {branch?.branchName && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Branch
                  </h3>
                  <p className="text-gray-800 text-xl">{branch.branchName}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Type
                </h3>
                <p className="text-gray-800 text-xl">{college.type || "N/A"}</p>
              </div>
              {course?.name && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Course
                  </h3>
                  <p className="text-gray-800 text-xl">
                    {course.name || "N/A"}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Established
                </h3>
                <p className="text-gray-800 text-xl">
                  {college.establishmentYear || "N/A"}
                </p>
              </div>
              {course?.duration && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Course Duration
                  </h3>
                  <p className="text-gray-800 text-xl">
                    {course.duration || "N/A"}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Address
                </h3>
                <p className="text-gray-800 text-xl">
                  {college.address || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Seats Available
                </h3>
                <p className="text-gray-800 text-xl">
                  {collegeCourse.seatAvailable}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Location
                </h3>
                <p className="text-gray-800 text-xl">
                  {college.cityModel?.name || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Course Fee
                </h3>
                <p className="text-gray-800 text-xl">₹{collegeCourse.fee}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-500 mb-1">
                Admission Criteria
              </h3>
              <p className="text-gray-800 mb-6">
                {collegeCourse.admissionCriteria || "N/A"}
              </p>
            </div>
            {branch?.about && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  About Branch
                </h3>
                <p className="text-gray-800 whitespace-pre-line">
                  {branch.about}
                </p>
              </div>
            )}

            {branch?.content && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  Branch Content
                </h3>
                <p className="text-gray-800 whitespace-pre-line">
                  {branch.content}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                About College
              </h3>
              <p className="text-gray-800 whitespace-pre-line">
                {college.description || "No description available."}
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
