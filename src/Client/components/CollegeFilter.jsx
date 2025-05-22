import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CollegeFilter = ({ onFilterChange }) => {
  // Selected filter states
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCollegeType, setSelectedCollegeType] = useState("");
  const [feeRange, setFeeRange] = useState([null, null]);

  // Data states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);

  // Local state for filters before applying
  const [pendingFilters, setPendingFilters] = useState({
    countryID: null,
    stateID: null,
    cityID: null,
    courseID: null,
    branchID: null,
    type: null,
    minFee: null,
    maxFee: null,
  });

  // Fetch data helper
  const fetchData = async (url) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5050/api${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      toast.error(`Failed to fetch data: ${error.message}`);
      return [];
    }
  };

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      const [countriesData, coursesData] = await Promise.all([
        fetchData("/Country/CountryDropDown"),
        fetchData("/Course/CourseDropDown"),
      ]);
      setCountries(countriesData);
      setCourses(coursesData);
    };
    loadInitialData();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchData(`/State/StateDropDown/${selectedCountry}`).then(setStates);
    } else {
      setStates([]);
      setSelectedState("");
    }
  }, [selectedCountry]);

  // Load cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetchData(`/City/CityDropDown/${selectedState}`).then(setCities);
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState]);

  // Load branches when course changes
  useEffect(() => {
    if (selectedCourse) {
      fetchData(`/Branch/BranchDropDown/${selectedCourse}`).then(setBranches);
    } else {
      setBranches([]);
      setSelectedBranch("");
    }
  }, [selectedCourse]);

  // Update filters function - now updates pending filters instead of calling parent immediately
  const updateFilters = (changes) => {
    setPendingFilters((prev) => ({
      ...prev,
      ...changes,
    }));
  };

  // Handle college type selection - update pending filters
  const handleCollegeTypeChange = (type) => {
    const newType = selectedCollegeType === type ? "" : type;
    setSelectedCollegeType(newType);
    updateFilters({ type: newType });
  };

  // Handle fee range change - update pending filters
  const handleFeeRangeChange = (index, value) => {
    const newRange = [...feeRange];
    newRange[index] = value === "" ? null : Number(value);
    setFeeRange(newRange);
    updateFilters({ minFee: newRange[0], maxFee: newRange[1] });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedCourse("");
    setSelectedBranch("");
    setSelectedCollegeType("");
    setFeeRange([null, null]);

    const clearedFilters = {
      countryID: null,
      stateID: null,
      cityID: null,
      courseID: null,
      branchID: null,
      type: null,
      minFee: null,
      maxFee: null,
    };

    setPendingFilters(clearedFilters);
    onFilterChange(clearedFilters); // Apply cleared filters immediately
  };

  // Apply current filters
  const handleApplyFilters = () => {
    onFilterChange(pendingFilters);
  };

  const handleClearSection = (section) => {
    switch (section) {
      case "location":
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
        updateFilters({
          countryID: null,
          stateID: null,
          cityID: null,
        });
        break;
      case "course":
        setSelectedCourse("");
        setSelectedBranch("");
        updateFilters({
          courseID: null,
          branchID: null,
        });
        break;
      case "fee":
        setFeeRange([null, null]);
        updateFilters({
          minFee: null,
          maxFee: null,
        });
        break;
      case "type":
        setSelectedCollegeType("");
        updateFilters({
          type: null,
        });
        break;
    }
  };

  // Update the class constants with better color contrast
  const selectClasses =
    "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const sectionClasses =
    "p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200 space-y-4";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="w-80 bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
      </div>

      {/* College Type Filter */}
      <div className="mb-4 border-b pb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">College Type</h3>
          <button
            onClick={() => handleClearSection("type")}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2 px-4 rounded ${
              selectedCollegeType === "Public"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            onClick={() => handleCollegeTypeChange("Public")}
          >
            Public
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded ${
              selectedCollegeType === "Private"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            onClick={() => handleCollegeTypeChange("Private")}
          >
            Private
          </button>
        </div>
      </div>

      {/* Location Filters */}
      <div className="mb-4 border-b pb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Location</h3>
          <button
            onClick={() => handleClearSection("location")}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="space-y-2">
          <select
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              updateFilters({ countryID: e.target.value || null });
            }}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.countryID} value={country.countryID}>
                {country.name}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-gray-200 disabled:text-gray-500"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              updateFilters({ stateID: e.target.value || null });
            }}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.stateID} value={state.stateID}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-gray-200 disabled:text-gray-500"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              updateFilters({ cityID: e.target.value || null });
            }}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.cityID} value={city.cityID}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course and Branch Filters */}
      <div className="mb-4 border-b pb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Course Details</h3>
          <button
            onClick={() => handleClearSection("course")}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="space-y-2">
          <select
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [&>option]:text-gray-900"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              updateFilters({ courseID: e.target.value || null });
            }}
          >
            <option value="" className="text-gray-900">
              Select Course
            </option>
            {courses.map((course) => (
              <option
                key={course.courseID}
                value={course.courseID}
                className="text-gray-900"
              >
                {course.name}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-gray-200 disabled:text-gray-500 [&>option]:text-gray-900"
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              updateFilters({ branchID: e.target.value || null });
            }}
            disabled={!selectedCourse}
          >
            <option value="" className="text-gray-900">
              Select Branch
            </option>
            {branches.map((branch) => (
              <option
                key={branch.branchID}
                value={branch.branchID}
                className="text-gray-900"
              >
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fee Range Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Fee Range</h3>
          <button
            onClick={() => handleClearSection("fee")}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
            value={feeRange[0] || ""}
            onChange={(e) => handleFeeRangeChange(0, e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border rounded bg-gray-50 text-gray-900 placeholder-gray-500"
            value={feeRange[1] || ""}
            onChange={(e) => handleFeeRangeChange(1, e.target.value)}
          />
        </div>

        {/* Filter Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleClearFilters}
            className="flex-1 py-2 px-4 text-sm bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 py-2 px-4 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeFilter;
