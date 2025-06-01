import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollegeFilter from "../components/CollegeFilter";
import CollegeResults from "../components/CollegeResults";
import toast from "react-hot-toast";

const FilterPage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultFilter = {
    countryID: null,
    stateID: null,
    cityID: null,
    courseID: null,
    branchID: null,
    minFee: null,
    maxFee: null,
  };

  const [filters, setFilters] = useState(defaultFilter);

  const fetchColleges = async (filterValues) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const processedFilters = Object.keys(filterValues).reduce((acc, key) => {
        acc[key] = filterValues[key] === "" ? null : filterValues[key];
        return acc;
      }, {});

      const response = await fetch(
        "http://localhost:5050/api/FilterColleges/filter",
        {
          method: "POST",
          headers,
          body: JSON.stringify(processedFilters),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.status) {
        const uniqueCourseIds = [
          ...new Set(data.data.map((college) => college.courseID)),
        ];
        const uniqueBranchIds = [
          ...new Set(data.data.map((college) => college.branchID)),
        ];

        const coursesResponse = await fetch(
          "http://localhost:5050/api/Course",
          { headers }
        );
        const coursesData = await coursesResponse.json();
        const coursesMap = {};
        if (coursesResponse.ok && coursesData.status) {
          coursesData.data.forEach((course) => {
            coursesMap[course.courseID] = course.name;
          });
        }

        const branchesResponse = await fetch(
          "http://localhost:5050/api/Branch",
          { headers }
        );
        const branchesData = await branchesResponse.json();
        const branchesMap = {};
        if (branchesResponse.ok && branchesData.status) {
          branchesData.data.forEach((branch) => {
            branchesMap[branch.branchID] = branch.branchName;
          });
        }

        const collegesWithDetails = data.data.map((college) => ({
          ...college,
          courseName:
            coursesMap[college.courseID] || `Course ID: ${college.courseID}`,
          branchName:
            branchesMap[college.branchID] || `Branch ID: ${college.branchID}`,
        }));

        console.log("Colleges with details:", collegesWithDetails);
        setColleges(collegesWithDetails);
      } else {
        setColleges([]);
        toast.error(data.message || "No colleges found");
      }
    } catch (err) {
      console.error("API error:", err);
      setColleges([]);
      toast.error("Error fetching colleges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges(defaultFilter);
  }, []);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    fetchColleges(updatedFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-grow bg-soky py-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-goray">
              Find Your Perfect College
            </h1>
            <p className="text-gray-400 mt-2">
              Use filters to narrow down your college search
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="sticky top-4">
                <CollegeFilter onFilterChange={handleFilterChange} />
              </div>
            </div>
            <div className="lg:w-3/4">
              <CollegeResults colleges={colleges} loading={loading} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilterPage;