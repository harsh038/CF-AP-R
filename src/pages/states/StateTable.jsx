import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";

function StateTable() {
  const [states, setStates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/State")
      .then((res) => res.json())
      .then((data) => setStates(data))
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
            toast.error("State can't be deleted as it is associated with a City", {
              className: "bg-red-950 text-white border border-red-400 rounded-xl",
            });
          } else {
            toast.success("State Deleted Successfully", {
              className: "bg-green-950 text-white border border-green-400 rounded-xl",
            });
            setStates((prev) => prev.filter((s) => s.stateID !== id));
          }
        })
        .catch((error) => {
          console.error("Error deleting State:", error);
          toast.error("Error deleting State. Please check the server.");
        });
    });
  };

  const filteredStates = states.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.countryModel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ReusableTable
      columns={["No.", "Name", "CountryName", "Actions"]}
      data={filteredStates}
      searchTerm={searchTerm}
      handleSearch={(e) => setSearchTerm(e.target.value)}
      addButtonLabel="Add State"
      addButtonLink="/addeditstate"
      tableName="State List"
    >
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
    </ReusableTable>
  );
}

export default StateTable;