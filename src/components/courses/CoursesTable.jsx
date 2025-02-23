import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../DeleteSweetAlert";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    fetch("http://localhost:5050/api/Course")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch((error) => console.error("Error fetching Courses:", error));
  }, []);

  const deleteCourse = (id) => {
    DeleteSweetAlert("You won't be able to revert the Course!", () => {
      fetch(`http://localhost:5050/api/Course/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            toast.error("Internal Server Error");
          }
        })
        .then((data) => {
          if (data.foreignKey) {
            toast.error(
              "Delete dependent rows from CollegeCourse or Syllabus table first"
            );
          } else {
            toast.success("Course Deleted Successfully", {
              className:
                " bg-green-950 text-white border border-green-400 rounded-xl ",
            });
            setCourses(courses.filter((c) => c.courseID !== id));
            setFilteredCourses(
              filteredCourses.filter((course) => course.courseID !== id)
            );
          }
        })
        .catch((error) => console.error("Error deleting Course:", error));
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.duration.toLowerCase().includes(term)
    );
    setFilteredCourses(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Courses List</h2>

        <div className="relative">
          <input
            type="text"
            placeholder="search courses"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditcourse`}>
          <button className=" text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
            Add Course
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredCourses.map((course, index) => (
              <motion.tr
                key={course.courseID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {course.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {course.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addeditcourse/${course.courseID}`}>
                    <button className="text-indigo-500 hover:text-indigo-700 mr-3">
                      <Edit size={16} />
                    </button>
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteCourse(course.courseID)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default CoursesTable;
