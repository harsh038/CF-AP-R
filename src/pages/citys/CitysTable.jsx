import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";

function CityTable({ updateCityStats }) {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/City")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        updateCityStats(data.length);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, [updateCityStats]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCities = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.stateModel.name.toLowerCase().includes(searchTerm)
  );

  const deleteCity = (id) => {
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
        setCities((prevCities) => prevCities.filter((c) => c.cityID !== id));
        updateCityStats(cities.length - 1);
      } catch (error) {
        console.error("Error deleting city:", error);
      }
    });
  };

  return (
    <ReusableTable
      columns={["No.", "City", "State", "Actions"]}
      data={filteredCities}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      addButtonLabel="Add City"
      addButtonLink="/admin/addeditcity"
      tableName="Cities List" 
    >
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
            <Link to={`/admin/addeditcity/${city.cityID}`}>
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
    </ReusableTable>
  );
}

export default CityTable;
