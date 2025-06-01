import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";

function CollegeCourseTable() {
  const [collegeCourses, setCollegeCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/CollegeCourse")
      .then((res) => res.json())
      .then((data) => {
        const seenCollegeIDs = new Set();
        const filteredData = data.filter((item) => {
          if (!seenCollegeIDs.has(item.collegeID)) {
            seenCollegeIDs.add(item.collegeID);
            return true;
          }
          return false;
        });
        setCollegeCourses(filteredData);
      })
      .catch((error) =>
        console.error("Error fetching College Courses:", error)
      );
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCollegeCourses = collegeCourses.filter(
    (c) =>
      c.collegeModel.name.toLowerCase().includes(searchTerm) ||
      String(c.totalSeatAvailable).includes(searchTerm) ||
      String(c.totalCourses).includes(searchTerm)
  );

  return (
    <ReusableTable
      columns={[
        "No.",
        "College Name",
        "Total Courses",
        "Total Seats Available",
        "Actions",
      ]}
      data={filteredCollegeCourses}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      addButtonLabel="Add College Course"
      addButtonLink="/admin/addeditcollegecourse"
      tableName="College Course List" 
    >
      {filteredCollegeCourses.map((college, index) => (
        <motion.tr
          key={college.collegeCourseID}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {index + 1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {college.collegeModel?.name || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {college.totalCourses || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {college.totalSeatAvailable || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            <Link to={`/admin/collegecoursedetails/${college.collegeID}`}>
              <button className="text-blue-500 hover:text-blue-300 mr-2">
                <Eye size={18} />
              </button>
            </Link>
          </td>
        </motion.tr>
      ))}
    </ReusableTable>
  );
}

export default CollegeCourseTable;
