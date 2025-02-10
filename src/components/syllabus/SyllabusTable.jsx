import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../common/DeleteSweetAlert";

const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    today.getDate() === checkDate.getDate() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getFullYear() === checkDate.getFullYear()
  );
};

function SyllabusTable({ updateSyllabusStats }) {
  const [syllabus, setSyllabus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSyllabus, setFilteredSyllabus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/Syllabus")
      .then((res) => res.json())
      .then((data) => {
        setSyllabus(data);
        setFilteredSyllabus(data);
        const totalCount = data.length;
        const newAddedToday = data.filter((s) => isToday(s.lastUpdated)).length;
        updateSyllabusStats(totalCount, newAddedToday);
      })
      .catch((error) => console.error("Error fetching Syllabus:", error));
  }, []);

  const deleteSyllabus = (id) => {
    DeleteSweetAlert("You won't be able to revert the Syllabus!", () => {
      fetch(`http://localhost:5050/api/Syllabus/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Syllabus Deleted Successfully", {
              className:
                " bg-green-950 text-white border  border border-green-400  rounded-xl ",
            });
            const updatedSyllabus = syllabus.filter((s) => s.syllabusID !== id);
            setSyllabus(updatedSyllabus);
            setFilteredSyllabus(updatedSyllabus);

            const total = updatedSyllabus.length;
            const newToday = updatedSyllabus.filter((s) =>
              isToday(s.lastUpdated)
            ).length;
            updateSyllabusStats(total, newToday);
          } else {
            toast.error("Internal Server Error");
          }
        })
        .catch((error) => console.error("Error deleting Syllabus:", error));
    });
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = syllabus.filter(
      (s) =>
        s.courseModel.name.toLowerCase().includes(term) ||
        s.content.toLowerCase().includes(term) ||
        new Date(s.lastUpdated)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .includes(term)
    );
    setFilteredSyllabus(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Syllabus List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search syllabus"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditsyllabus`}>
          <button className="text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
            Add Syllabus
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
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredSyllabus.map((syllabus, index) => (
              <motion.tr
                key={syllabus.syllabusID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {syllabus.courseModel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {syllabus.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(syllabus.lastUpdated).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addeditsyllabus/${syllabus.syllabusID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </Link>
                  {"  "}
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteSyllabus(syllabus.syllabusID)}
                  >
                    <Trash2 size={18} />
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

export default SyllabusTable;
