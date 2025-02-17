import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../common/DeleteSweetAlert";
import DeleteSweetAlert from "../common/DeleteSweetAlert";

const isToday = (date) => {
  const checkDate = new Date(date);
  const today = new Date();
  return today.toDateString() === checkDate.toDateString();
};

function CityTable({ updateCityStats }) {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/City")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        updateCityStats(
          data.length,
          data.filter((c) => isToday(c.lastUpdated)).length
        );
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, [updateCityStats]);

  const deleteCity = useCallback(
    (id) => {
      DeleteSweetAlert("You won't be able to revert the City!", async () => {
        try {
          const res = await fetch(`http://localhost:5050/api/City/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Internal Server Error");

          const data = await res.json();
          if (data.foreignKey) {
            toast.error(
              "City can't be deleted as it is associated with a CollegeTable",
              {
                className:
                  "bg-red-950 text-white border border-red-400 rounded-xl",
              }
            );
            return;
          }

          toast.success("City Deleted Successfully");
          setCities((prevCities) => {
            const updatedCities = prevCities.filter((c) => c.cityID !== id);
            updateCityStats(
              updatedCities.length,
              updatedCities.filter((c) => isToday(c.lastUpdated)).length
            );
            return updatedCities;
          });
        } catch (error) {
          console.error("Error deleting city:", error);
        }
      });
    },
    [updateCityStats]
  );

  const filteredCities = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.stateModel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">City List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search cities"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditcity`}>
          <button className="text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
            Add City
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
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredCities.map((city, index) => (
              <motion.tr
                key={city.cityID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {city.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {city.stateModel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addeditcity/${city.cityID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteCity(city.cityID)}
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

export default CityTable;
