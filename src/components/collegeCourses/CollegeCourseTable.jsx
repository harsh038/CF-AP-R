import { motion } from "framer-motion";
import { Edit, Eye, Search, Trash2, User, View } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

function CollegeCourseTable() {
  const [collegeCourses, setCollegeCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCollegeCourses, setFilteredCollegeCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/CollegeCourse")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const seenFilteredColleges = [];
        const seenCollegeIDs = new Set();

        data.forEach((item) => {
          if (!seenCollegeIDs.has(item.collegeID)) {
            seenCollegeIDs.add(item.collegeID);
            seenFilteredColleges.push(item);
          }
        });
        setCollegeCourses(seenFilteredColleges);
        setFilteredCollegeCourses(seenFilteredColleges);
      })
      .catch((error) =>
        console.error("Error fetching Colcollege Wise Courses:", error)
      );
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = collegeCourses.filter(
      (c) =>
        c.collegeModel.name.toLowerCase().includes(term) ||
        String(c.totalSeatAvailable).includes(term) ||
        String(c.totalCourses).includes(term)
    );
    setFilteredCollegeCourses(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          College Wise Course List
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search college-wise courses"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditcollegecourse`}>
          <button className="text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
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
                College Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Seats Available
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
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
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                  <Link to={`/collegecoursedetails/${college.collegeID}`}>
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
  // return (
  //   <motion.div
  //     className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     transition={{ delay: 0.2 }}
  //   >
  //     <div className="flex justify-between items-center mb-6">
  //       <h2 className="text-xl font-semibold text-gray-100">
  //         College Wise Course List
  //       </h2>

  //       <div className="relative">
  //         <input
  //           type="text"
  //           placeholder="search colleges wise course"
  //           className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
  //           onChange={handleSearch}
  //           value={searchTerm}
  //         />
  //         <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
  //       </div>
  //       <Link to={`/addeditcollegecourse`}>
  //         <button className=" text-white px-4 py-2 rounded-lg bg-skyblue-800 bg-blue-800 border hover:border-blue-500 border-blue-800 ">
  //           Add College
  //         </button>
  //       </Link>
  //     </div>

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full divide-y divide-gray-700">
  //         <thead>
  //           <tr>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
  //               No.
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
  //               college name
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
  //               total courses
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
  //               total seatAvailable
  //             </th>
  //           </tr>
  //         </thead>

  //         <tbody className="divide-y divide-gray-700">
  //           {filteredCollegeCourses.map((college, index) => (
  //             <motion.tr
  //               key={college.collegeCourseID}
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //               transition={{ duration: 1 }}
  //             >
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
  //                 {index + 1}
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
  //                 {college.collegeModel.name}
  //               </td>

  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
  //                 {college.totalCourses}
  //               </td>
  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
  //                 {college.totalSeatAvailable}
  //               </td>

  //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
  //                 <Link to={`/collegecoursedetails/${college.collegeID}`}>
  //                   <button className="text-blue-500 hover:text-blue-300 mr-2">
  //                     <Eye size={18} />
  //                   </button>
  //                 </Link>
  //               </td>
  //             </motion.tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </motion.div>
  // );
}
export default CollegeCourseTable;
