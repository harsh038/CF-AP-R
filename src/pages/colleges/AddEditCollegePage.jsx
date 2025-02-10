import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

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
    rating: "",
    website: "",
    description: "",
  });

  // Reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      toast.error(`Error fetching data from ${url}`);
      throw error;
    }
  };

  // Fetch country dropdown data
  useEffect(() => {
    fetchData("http://localhost:5050/api/Country/CountryDropDown").then(
      (data) => setCountryDD(data)
    );

    // Fetch all cities for validation
    fetchData("http://localhost:5050/api/City").then((data) => setAllCities(data));
  }, []);

  // Load state dropdown based on country selection
  function LoadStateDD(countryID) {
    if (countryID > 0) {
      fetchData(`http://localhost:5050/api/State/StateDropDown/${countryID}`).then((data) => {
        setStateDD(data);
      });
    } else {
      setStateDD([]); // Clear state dropdown
    }
  }

  // Fetch city data for editing
  useEffect(() => {
    if (id) {
      fetchData(`http://localhost:5050/api/College/${id}`).then((collegeData) => {
        

        setFormData({
          cityID: collegeData.cityID,
          name: collegeData.name,
          type: collegeData.type,
          rating: collegeData.rating,
          website: collegeData.website,
          description: collegeData.description,
          collegeID: collegeData.collegeID,
          countryID: collegeData.countryID,
          stateID: collegeData.stateID,
        });

        
        LoadStateDD(collegeData.countryID);
        if (collegeData.stateID) {
          LoadCityDD(collegeData.stateID);
        }
      });
    }
  }, [id]);

  // Load city dropdown based on state selection
  function LoadCityDD(stateID) {
    if (stateID > 0) {
      fetchData(`http://localhost:5050/api/City/CityDropDown/${stateID}`).then((data) => {
        setAllCities(data);
      });
    } else {
      setAllCities([]); // Clear city dropdown
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    if (e.target.name === "countryID") {
      LoadStateDD(e.target.value);
    }
    if (e.target.name === "stateID") {
      LoadCityDD(e.target.value);
    }

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation schema for Yup
  const validationSchema = Yup.object({
    countryID: Yup.string().required("Country is required"),
    stateID: Yup.string().required("State is required"),
    cityID: Yup.string().required("City is required"),
    name: Yup.string()
      .required("College name is required")
      .max(100, "College name must be less than 100 characters"),
    type: Yup.string().required("College type is required"),
    rating: Yup.number().required("Rating is required").min(0).max(5),
    website: Yup.string().url("Invalid URL").required("Website is required"),
    description: Yup.string().required("Description is required"),
  });

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
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
      ? `http://localhost:5050/api/College/${id}`
      : `http://localhost:5050/api/College`;
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(id ? "College updated successfully." : "College added successfully.");
        navigate("/colleges");
      })
      .catch((error) => {
        toast.error(error.message || "Error adding college.");
        console.error("Error adding college:", error);
      });
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
            {/* College Fields First */}
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
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
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
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Rating:</span>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Enter rating"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.rating && <p className="text-red-600 text-sm">{errors.rating}</p>}
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
              {errors.website && <p className="text-red-600 text-sm">{errors.website}</p>}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Description:</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
            </label>

            {/* Country, State, City Dropdowns */}
            <label className="flex flex-col gap-2">
              <span className="text-white">Country:</span>
              <select
                name="countryID"
                value={formData.countryID}
                onChange={handleInputChange}
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select Country</option>
                {countryDD.map((country) => (
                  <option key={country.countryID} value={ country.countryID }>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.countryID && <p className="text-red-600 text-sm">{errors.countryID}</p>}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">State:</span>
              <select
                name="stateID"
                value={formData.stateID}
                onChange={handleInputChange}
                disabled={!formData.countryID}
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select State</option>
                {stateDD.map((state) => (
                  <option key={state.stateID} value={state.stateID}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.stateID && <p className="text-red-600 text-sm">{errors.stateID}</p>}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">City:</span>
              <select
                name="cityID"
                value={formData.cityID}
                onChange={handleInputChange}
                disabled={!formData.stateID}
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select City</option>
                {allCities.map((city) => (
                  <option key={city.cityID} value={city.cityID}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityID && <p className="text-red-600 text-sm">{errors.cityID}</p>}
            </label>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
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
