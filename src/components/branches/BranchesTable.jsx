import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ReusableTable from "../ReusableTable";
import { motion } from "framer-motion";

function BranchesTable() {
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/Branch")
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error("Error fetching Branches:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBranches = branches.filter(
    (s) =>
      s.branchName.toLowerCase().includes(searchTerm) ||
      s.courseModel.name.toLowerCase().includes(searchTerm) ||
      s.about.toLowerCase().includes(searchTerm) ||
      s.content.toLowerCase().includes(searchTerm)
  );

  return (
    <ReusableTable
      columns={["No.", "Name", "Course Name", "Actions"]}
      data={filteredBranches}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      addButtonLabel="Add Branch"
      addButtonLink="/addeditbranch"
      tableName="Branches List" 
    >
      {filteredBranches.map((branch, index) => (
        <motion.tr
          key={branch.branchID}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {index + 1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {branch.branchName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {branch.courseModel.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            <Link to={`/viewbranchdetail/${branch.branchID}`}>
              <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                <Eye size={18} />
              </button>
            </Link>
          </td>
        </motion.tr>
      ))}
    </ReusableTable>
  );
}

export default BranchesTable;