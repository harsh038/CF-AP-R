import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  GraduationCap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("colleges");
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  const categories = [
    { id: "colleges", label: "Colleges", icon: Building2 },
    { id: "branches", label: "Branches", icon: GraduationCap },
    { id: "courses", label: "Courses", icon: BookOpen },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        switch (activeCategory) {
          case "colleges":
            const collegeResponse = await fetch(
              "http://localhost:5050/api/College"
            );
            if (collegeResponse.ok) {
              const data = await collegeResponse.json();
              setColleges(data);
            }
            break;
          case "branches":
            const branchResponse = await fetch(
              "http://localhost:5050/api/Branch"
            );
            if (branchResponse.ok) {
              const data = await branchResponse.json();
              setBranches(data);
            }
            break;
          case "courses":
            const courseResponse = await fetch(
              "http://localhost:5050/api/Course"
            );
            if (courseResponse.ok) {
              const data = await courseResponse.json();
              setCourses(data);
            }
            break;
        }
      } catch (error) {
        toast.error(`Failed to load ${activeCategory}`);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const getSlug = (name) => {
    return (
      name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || ""
    );
  };

  const getCurrentData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    switch (activeCategory) {
      case "colleges":
        return colleges.slice(startIndex, endIndex);
      case "branches":
        return branches.slice(startIndex, endIndex);
      case "courses":
        return courses.slice(startIndex, endIndex);
      default:
        return [];
    }
  };

  const totalPages = Math.ceil(
    (activeCategory === "colleges"
      ? colleges.length
      : activeCategory === "branches"
      ? branches.length
      : courses.length) / itemsPerPage
  );

  const renderCard = (item) => {
    switch (activeCategory) {
      case "colleges":
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              navigate(`/college/${item.id}/${getSlug(item.name)}`)
            }
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <Building2 className="h-4 w-4" />
                <span>{item.type || "Educational Institution"}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item.description || "No description available"}
              </p>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {item.cityModel?.name || "Location N/A"}
                  </span>
                  <span className="text-blue-600 font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "branches":
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <GraduationCap className="h-4 w-4" />
              <span>Branch</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {item.description || "No description available"}
            </p>
          </div>
        );
      case "courses":
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <BookOpen className="h-4 w-4" />
              <span>Course</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {item.description || "No description available"}
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
            <div className="flex space-x-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setCurrentPage(1);
                    }}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap
                      ${
                        activeCategory === category.id
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }
                      transition-colors shadow-sm
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getCurrentData().map(renderCard)}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-8"
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorePage;
