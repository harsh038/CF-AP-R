import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CollegeResults = ({ colleges, loading }) => {
  const navigate = useNavigate();
  const [coursesMap, setCoursesMap] = useState({});
  const [branchesMap, setBranchesMap] = useState({});

  // Fetch course and branch details when colleges data changes
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Fetch courses
        const coursesResponse = await fetch(
          "http://localhost:5050/api/Course",
          {
            headers,
          }
        );
        const coursesData = await coursesResponse.json();

        if (Array.isArray(coursesData)) {
          const mapping = {};
          coursesData.forEach((course) => {
            mapping[course.courseID] = course.name || course.courseName;
          });
          setCoursesMap(mapping);
        }

        // Fetch branches
        const branchesResponse = await fetch(
          "http://localhost:5050/api/Branch",
          {
            headers,
          }
        );
        const branchesData = await branchesResponse.json();

        if (Array.isArray(branchesData)) {
          const mapping = {};
          branchesData.forEach((branch) => {
            mapping[branch.branchID] = branch.name || branch.branchName;
          });
          setBranchesMap(mapping);
        }
      } catch (err) {
        console.error("Error fetching course/branch details:", err);
      }
    };

    if (colleges.length > 0) {
      fetchDetails();
    }
  }, [colleges]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!Array.isArray(colleges) || colleges.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] bg-white rounded-xl p-8">
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Colleges Found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college, index) => {
        const courseName = coursesMap[college.courseID];
        const branchName = branchesMap[college.branchID];

        return (
          <div
            key={`${college.collegeID}-${index}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-[250px] flex flex-col"
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-start gap-2 mb-3">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                  {college.collegeName}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    college.collegeType === "Private"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {college.collegeType}
                </span>
              </div>

              {/* Course and Branch Information */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">COURSE</p>
                  <p className="text-sm font-medium text-gray-800">
                    {courseName || `Course ID: ${college.courseID}`}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">BRANCH</p>
                  <p className="text-sm font-medium text-gray-800">
                    {branchName || `Branch ID: ${college.branchID}`}
                  </p>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate(`/college/${college.collegeID}`)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  View More
                </button>
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
                >
                  Website
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollegeResults;
