import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../DeleteSweetAlert";

function CountryTable() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/Country");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleDelete = async (id) => {
    DeleteSweetAlert("You won't be able to revert this!", async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/Country/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          toast.error(
            "Please delete all dependent rows in the State table first."
          );
          return;
        }

        const data = await res.json();
        if (data.foreignKey) {
          toast.error(
            "Country can't be deleted as it is associated with a State",
            {
              className:
                "bg-red-950 text-white border border-red-400 rounded-xl",
            }
          );
        } else {
          toast.success("Country Deleted Successfully", {
            className:
              "bg-green-950 text-white border border-green-400 rounded-xl",
          });
          setCountries((prev) => prev.filter((c) => c.countryID !== id));
        }
      } catch (error) {
        console.error("Error deleting country:", error);
        toast.error("Error deleting country. Please check the server.");
      }
    });
  };

  const filteredCountries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? countries.filter((c) => c.name.toLowerCase().includes(term))
      : countries;
  }, [countries, searchTerm]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Country List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search countries"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addeditcountry`}>
          <button className="text-white px-4 py-2 rounded-lg bg-blue-800 border hover:border-blue-500 border-blue-800">
            Add Country
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredCountries.map((country, index) => (
              <motion.tr
                key={country.countryID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {country.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addeditcountry/${country.countryID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(country.countryID)}
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

export default CountryTable;