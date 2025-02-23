import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";

function CollegesTable() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/College")
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((error) => console.error("Error fetching Colleges:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.cityModel.name.toLowerCase().includes(searchTerm) ||
      c.type.toLowerCase().includes(searchTerm) ||
      c.address.toLowerCase().includes(searchTerm) ||
      c.establishmentYear.toString().includes(searchTerm)
  );

  return (
    <ReusableTable
      columns={["No.", "Name", "CityName", "Type", "Establishment", "View"]}
      data={filteredColleges}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      addButtonLabel="Add College"
      addButtonLink="/addeditcollege"
      tableName="Colleges List"
    >
      {filteredColleges.map((college, index) => (
        <motion.tr
          key={college.collegeID}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {index + 1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {college.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {college.cityModel.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            <span className="text-center px-3 py-1 text-gray-100 bg-blue-800 hover:bg-blue-700 p-1 rounded-full">
              {college.type}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {college.establishmentYear}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            <Link to={`/collegedetails/${college.collegeID}`}>
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

export default CollegesTable;
