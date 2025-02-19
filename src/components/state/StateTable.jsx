import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../common/DeleteSweetAlert";

function StateTable() {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/State")
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        setFilteredStates(data);
      })
      .catch((error) => console.error("Error fetching States:", error));
  }, []);

  const deleteState = (id) => {
    DeleteSweetAlert("You won't be able to revert the State!", () => {
      fetch(`http://localhost:5050/api/state/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            toast.error("Error");
          }
        })
        .then((data) => {
          if (data.foreignKey) {
            toast.error(
              "State can't be deleted as it is associated with a City",
              {
                className:
                  " bg-red-950 text-white border  border border-red-400  rounded-xl ",
              }
            );
          } else {
            toast.success("State Deleted Successfully", {
              className:
                " bg-green-950 text-white border  border border-green-400  rounded-xl ",
            });
            const updatedState = states.filter((s) => s.stateID !== id);
            setStates(updatedState);
            setFilteredStates(updatedState);
          }
        })
        .catch((error) => {
          console.error("Error deleting State:", error);
          toast.error("Error deleting State. Please check the server.");
        });
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = states.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.countryModel.name.toLowerCase().includes(term)
    );
    setFilteredStates(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">State List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search state"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditstate`}>
          <button className="text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
            Add State
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
                CountryName
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredStates.map((state, index) => (
              <motion.tr
                key={state.stateID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {state.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {state.countryModel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addeditstate/${state.stateID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteState(state.stateID)}
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

export default StateTable;
