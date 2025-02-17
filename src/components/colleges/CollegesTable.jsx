import { motion } from "framer-motion";
import { Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CollegesTable() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/College")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setFilteredColleges(data);
      })
      .catch((error) => console.error("Error fetching Colleges:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = colleges.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.cityModel.name.toLowerCase().includes(term) ||
        c.type.toLowerCase().includes(term) ||
        c.rating.toString().includes(term)
    );
    setFilteredColleges(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Colleges List</h2>

        <div className="relative">
          <input
            type="text"
            placeholder="search colleges"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditcollege`}>
          <button className=" text-white px-4 py-2 rounded-lg bg-skyblue-800 bg-blue-800 border hover:border-blue-500 border-blue-800 ">
            Add College
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
                CityName
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
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
                  <span className="text-center  px-3 py-1 text-gray-100 bg-blue-800  hover:bg-blue-700 p-1 rounded-full">
                    {college.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {college.rating}
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
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
export default CollegesTable;
