import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CollegeFilter from "../components/CollegeFilter";
import CollegeResults from "../components/CollegeResults";
import toast from "react-hot-toast";

const FilterPage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState([]);

  // Default filter values
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

  // Filter colleges based on type
  useEffect(() => {
    if (!filters.type) {
      setFilteredColleges(colleges);
    } else {
      const filtered = colleges.filter(
        (college) => college.collegeType === filters.type
      );
      setFilteredColleges(filtered);
    }
  }, [colleges, filters.type]);

  // Fetch filtered colleges from API
  const fetchColleges = async (filterValues) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Remove type from API request since we'll filter it on frontend
      const { type, ...apiFilters } = filterValues;

      // Convert empty strings to null
      const processedFilters = Object.keys(apiFilters).reduce((acc, key) => {
        acc[key] = apiFilters[key] === "" ? null : apiFilters[key];
        return acc;
      }, {});

      // Fetch colleges
      const response = await fetch(
        "http://localhost:5050/api/FilterColleges/filter",
        {
          method: "POST",
          headers,
          body: JSON.stringify(processedFilters),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setColleges(data.data || []);
    } catch (err) {
      console.error("API error:", err);
      setColleges([]);
      toast.error("Something went wrong while fetching colleges");
    } finally {
      setLoading(false);
    }
  };

  // On initial load → show all results
  useEffect(() => {
    fetchColleges(defaultFilter);
  }, []);

  // Called from CollegeFilter when filter is updated
  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    fetchColleges(updatedFilters);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-soky pt-20 p-10 lg:p-10">
        <div className="container mx-auto mt-8">
          <div className="flex gap-6">
            <CollegeFilter onFilterChange={handleFilterChange} />
            <CollegeResults colleges={filteredColleges} loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilterPage;
