import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditCityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [countryDD, setCountryDD] = useState([]);
  const [stateDD, setStateDD] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [formData, setFormData] = useState({
    countryID: "",
    stateID: "",
    name: "",
  });

  // Reusable fetch function
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      toast.error(`Error fetching data from ${url}`);
      // console.error("Fetch Error:", error);
      throw error;
    }
  };

  // Fetch country dropdown data
  useEffect(() => {
    fetchData("http://localhost:5050/api/Country/CountryDropDown").then(
      (data) => setCountryDD(data)
    );

    // Fetch all cities for validation
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
      setStateDD([]); // Clear state dropdown
    }
  }

  // Fetch city data for editing
  useEffect(() => {
    if (id) {
      fetchData(`http://localhost:5050/api/City/${id}`).then((cityData) => {

        setFormData({
          countryID: cityData.countryId,
          stateID: cityData.stateID,
          name: cityData.name,
        });

        // Pre-fetch state dropdown
        // fetchData(
        //   `http://localhost:5050/api/State/StateDropDown/${cityData.stateModel.countryID}`
        // ).then((states) => {
        //   setStateDD(states);
        // });
        LoadStateDD(cityData.countryId);
      });
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    if (e.target.name == "countryID") {
      LoadStateDD(e.target.value);
    }

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidationSchema = Yup.object({
    countryID: Yup.string().required("Country is required"),
    stateID: Yup.string().required("State is required"),
    name: Yup.string()
      .required("City name is required")
      .max(100, "City name must be less than 100 characters")
      .test(
        "unique-city",
        "City already exists for the selected state and country",
        function (value) {
          const { countryID, stateID } = this.parent; // Access related fields
        

          if (!countryID || !stateID || !value) {
            return true;
          }
          const isDuplicate = allCities.some((city) => {
            const match =
              city.name.toLowerCase() === value.toLowerCase() &&
              city.stateID === stateID &&
              city.stateModel?.countryID === countryID;
            if (match) {
              console.log("Duplicate found:", city);
            }
            return match;
          });

          if (isDuplicate) {
            console.log("Validation failed: City already exists.");
          } else {
            console.log("Validation passed: City is unique.");
          }

          return !isDuplicate;
        }
      ),
  });

  // Form submit handler
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
      ? `http://localhost:5050/api/City/${id}`
      : `http://localhost:5050/api/City`;
    const method = id ? "PUT" : "POST";

    // Send request
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(
          id ? "City updated successfully." : "City added successfully."
        );
        navigate("/city");
      })
      .catch((error) => {
        toast.error(error.message || "Error adding city.");
        console.error("Error adding city:", error);
      });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={id ? "Edit City" : "Add City"} />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
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
              {errors.stateID && (
                <p className="text-red-600 text-sm">{errors.stateID}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">City Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </label>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
            >
              {id ? "Update City" : "Add City"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AddEditCityPage;
