import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";

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

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ReusableTable
      columns={["No.", "Name", "Actions"]}
      data={filteredCountries}
      searchTerm={searchTerm}
      handleSearch={(e) => setSearchTerm(e.target.value)}
      addButtonLabel="Add Country"
      addButtonLink="/addeditcountry"
      tableName="Country List"
    >
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
    </ReusableTable>
  );
}

export default CountryTable;
