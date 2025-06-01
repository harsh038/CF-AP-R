import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Yup from "yup";
import Header from "../../components/Header";

const AddEditCollegePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [countryDD, setCountryDD] = useState([]);
  const [stateDD, setStateDD] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [formData, setFormData] = useState({
    countryID: "",
    stateID: "",
    cityID: "",
    name: "",
    type: "Private",
    establishmentYear: "",
    address: "",
    website: "",
    description: "",
  });

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(`Error fetching data from ${url}`);
      console.error(`Fetch error from ${url}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData("http://localhost:5050/api/Country/CountryDropDown").then(
      (data) => setCountryDD(data)
    );

    fetchData("http://localhost:5050/api/City").then((data) =>
      setAllCities(data)
    );
  }, []);

  function LoadStateDD(countryID) {
    if (countryID > 0) {
      fetchData(
        `http://localhost:5050/api/State/StateDropDown/${countryID}`
      ).then((data) => {
        setStateDD(data);
      });
    } else {
      setStateDD([]);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(`http://localhost:5050/api/College/${id}`).then(
        (collegeData) => {
          setFormData({
            id: collegeData.id || id, // Add this line to store id
            countryID: collegeData.countryID || "",
            stateID: collegeData.stateID || "",
            cityID: collegeData.cityID || "",
            name: collegeData.name || "",
            type: collegeData.type || "Private",
            establishmentYear: collegeData.establishmentYear || "",
            address: collegeData.address || "",
            website: collegeData.website || "",
            description: collegeData.description || "",
          });
          LoadStateDD(collegeData.countryID);
          if (collegeData.stateID) {
            LoadCityDD(collegeData.stateID);
          }
        }
      );
    }
  }, [id]);

  function LoadCityDD(stateID) {
    if (stateID > 0) {
      fetchData(`http://localhost:5050/api/City/CityDropDown/${stateID}`).then(
        (data) => {
          setAllCities(data);
        }
      );
    } else {
      setAllCities([]); 
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "countryID") {
      LoadStateDD(value);
      setFormData({ ...formData, countryID: value, stateID: "", cityID: "" });
      setStateDD([]);
      setAllCities([]);
      return;
    }

    if (name === "stateID") {
      LoadCityDD(value);
      setFormData({ ...formData, stateID: value, cityID: "" });
      setAllCities([]);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validationSchema = Yup.object({
    countryID: Yup.string().required("Country is required"),
    stateID: Yup.string().required("State is required"),
    cityID: Yup.string().required("City is required"),

    name: Yup.string()
      .required("College name is required")
      .max(100, "College name must be less than 100 characters"),

    type: Yup.string().required("College type is required"),

    establishmentYear: Yup.number()
      .typeError("Establishment year must be a number")
      .integer("Year must be a whole number")
      .min(1800, "Establishment year must be after 1800")
      .max(new Date().getFullYear(), `Year cannot be in the future`)
      .required("Establishment year is required"),

    website: Yup.string().required("Website is required"),

    address: Yup.string().required("Address is required"),

    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.website &&
      !formData.website.startsWith("http://") &&
      !formData.website.startsWith("https://")
    ) {
      formData.website = "https://" + formData.website;
    }

    try {
      const url = formData.id
        ? `http://localhost:5050/api/College/${formData.id}`
        : "http://localhost:5050/api/College";

      const method = formData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save college");
      }

      navigate("/admin/colleges");
    } catch (error) {
      console.error("Error adding/updating college:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={id ? "Edit College" : "Add College"} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span className="text-white">College Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter college name"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Type:</span>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
              {errors.type && (
                <p className="text-red-600 text-sm">{errors.type}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Establishment Year</span>
              <input
                type="number"
                name="establishmentYear"
                value={formData.establishmentYear}
                onChange={handleInputChange}
                placeholder="Enter Establishment Year"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.establishmentYear && (
                <p className="text-red-600 text-sm">
                  {errors.establishmentYear}
                </p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Website:</span>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter website"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.website && (
                <p className="text-red-600 text-sm">{errors.website}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Address :</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                rows={3}
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Description:</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Country:</span>
              <select
                name="countryID"
                value={formData.countryID}
                onChange={handleInputChange}
                className="bg-gray-700 text-white rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select Country</option>
                {countryDD.map((country) => (
                  <option key={country.countryID} value={country.countryID}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.countryID && (
                <p className="text-red-600 text-sm">{errors.countryID}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">State:</span>
              <select
                name="stateID"
                value={formData.stateID}
                onChange={handleInputChange}
                className="bg-gray-700 text-white rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={!stateDD.length}
              >
                <option value="">Select State</option>
                {stateDD.map((state) => (
                  <option key={state.stateID} value={state.stateID}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.stateID && (
                <p className="text-red-600 text-sm">{errors.stateID}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">City:</span>
              <select
                name="cityID"
                value={formData.cityID}
                onChange={handleInputChange}
                className="bg-gray-700 text-white rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={!allCities.length}
              >
                <option value="">Select City</option>
                {allCities.map((city) => (
                  <option key={city.cityID} value={city.cityID}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityID && (
                <p className="text-red-600 text-sm">{errors.cityID}</p>
              )}
            </label>

            <button
              type="submit"
              className="self-center bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-lg"
            >
              {id ? "Update College" : "Add College"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AddEditCollegePage;
