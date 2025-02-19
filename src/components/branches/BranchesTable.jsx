import { motion } from "framer-motion";
import { Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../common/DeleteSweetAlert";

function BranchesTable() {
  const [Branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/Branch")
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
      })
      .catch((error) => console.error("Error fetching Branches:", error));
  }, []);



  const filteredBranches = useMemo(
    () =>
      Branches.filter(
        (s) =>
          s.branchName.toLowerCase().includes(searchTerm) ||
          s.courseModel.name.toLowerCase().includes(searchTerm) ||
          s.content.toLowerCase().includes(searchTerm)
      ),
    [Branches, searchTerm]
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-100 w-full sm:w-auto text-center sm:text-left">
          Branches List
        </h2>

        {/* Search Box */}
        <div className="relative flex-1 min-w-[200px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px]">
          <input
            type="text"
            placeholder="Search Branches"
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Add Branch Button */}
        <Link to={`/addeditBranches`} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
            Add Branches
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["No.", "name", "Course Name", "Content", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredBranches.map((s, index) => (
              <motion.tr
                key={s.branchID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {s.branchName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {s.courseModel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {s.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/viewbranchdetail/${s.branchID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Eye size={18} />
                    </button>
                  </Link>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addeditBranches/${s.branchID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteBranches(s.branchID)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td> */}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default BranchesTable;
