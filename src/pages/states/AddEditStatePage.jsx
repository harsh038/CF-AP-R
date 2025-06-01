import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditStatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [countryDD, setCountryDD] = useState([]);
  const [formData, setFormData] = useState({
    countryID: "",
    name: "",
  });

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      toast.error(`Error fetching data from ${url}`);
      console.error("Fetch Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(`http://localhost:5050/api/state/${id}`).then((data) => {
        setFormData({
          countryID: data.countryID,
          name: data.name,
        });
      });
    }
  }, [id]);

  useEffect(() => {
    fetchData("http://localhost:5050/api/country/countryDropDown").then(
      (data) => {
        setCountryDD(data);
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidationSchema = Yup.object({
    countryID: Yup.string().required("Country is required"),
    name: Yup.string()
      .required("State name is required")
      .max(100, "State name must be less than 100 characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const url = id
      ? `http://localhost:5050/api/state/${id}`
      : `http://localhost:5050/api/state`;
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(
          id ? "State updated successfully." : "State added successfully.",
          {
            className:
              " bg-green-950 text-white border  border border-green-400  rounded-xl ",
          }
        );
        navigate("/admin/state");
      })
      .catch((error) => {
        toast.error(error.message || "Error adding state.", {
          className:
            " bg-red-950 text-white border  border border-red-400  rounded-xl ",
        });
        console.error("Error adding state:", error);
      });
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        {id ? <Header title="Edit State" /> : <Header title="Add State" />}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                Country Name:
                <select
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  name="countryID"
                  value={formData.countryID}
                  onChange={handleInputChange}
                >
                  <option value="">Select Country</option>
                  {countryDD.map((country) => (
                    <option key={country.countryID} value={country.countryID}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.countryID && (
                  <span className="text-red-600 text-sm">
                    {errors.countryID}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                State Name:
                <input
                  type="text"
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter state name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </label>
              <button
                className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
                type="submit"
              >
                {id ? "Update State" : "Add State"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AddEditStatePage;
