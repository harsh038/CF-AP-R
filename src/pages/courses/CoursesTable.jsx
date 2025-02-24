import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/Course")
      .then((res) => res.json())
      .then((data) => setCourses(data))
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
            toast.error("Delete dependent rows from CollegeCourse or Syllabus table first");
          } else {
            toast.success("Course Deleted Successfully", {
              className: "bg-green-950 text-white border border-green-400 rounded-xl",
            });
            setCourses((prev) => prev.filter((c) => c.courseID !== id));
          }
        })
        .catch((error) => console.error("Error deleting Course:", error));
    });
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ReusableTable
      columns={["No.", "Name", "Duration", "Actions"]}
      data={filteredCourses}
      searchTerm={searchTerm}
      handleSearch={(e) => setSearchTerm(e.target.value)}
      addButtonLabel="Add Course"
      addButtonLink="/addeditcourse"
      tableName="Courses List"
    >
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
              <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                <Edit size={18} />
              </button>
            </Link>
            <button
              className="text-red-400 hover:text-red-300"
              onClick={() => deleteCourse(course.courseID)}
            >
              <Trash2 size={18} />
            </button>
          </td>
        </motion.tr>
      ))}
    </ReusableTable>
  );
}

export default CoursesTable;