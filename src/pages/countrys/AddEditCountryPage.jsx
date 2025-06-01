import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Header from "../../components/Header";

const AddEditCountryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetch("http://localhost:5050/api/Country")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);
      })
      .catch((error) => {
        toast.error("Error fetching countries list.");
        console.error("Error fetching countries list:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5050/api/Country/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({ name: data.name });
        })
        .catch((error) => {
          toast.error("Error fetching country data.");
          console.error("Error fetching country data:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidationSchema = Yup.object({
    name: Yup.string()
      .required("Country name is required")
      .max(100, "Country name must be less than 100 characters")
      .test("unique-country", "Country name already exists", function (value) {
        if (!value) return true;
        const isDuplicate = allCountries.some(
          (country) => country.name.toLowerCase() === value.toLowerCase()
        );
        return !isDuplicate;
      }),
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
      ? `http://localhost:5050/api/Country/${id}`
      : `http://localhost:5050/api/Country`;
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(
          id ? "Country updated successfully." : "Country added successfully.",
          {
            className:
              " bg-green-950 text-white border border-green-400 rounded-xl",
          }
        );
        navigate("/admin/country");
      })
      .catch((error) => {
        toast.error("Error saving country.", {
          className: " bg-red-950 text-white border border-red-400 rounded-xl",
        });
        console.error("Error saving country:", error);
      });
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        {id ? <Header title="Edit Country" /> : <Header title="Add Country" />}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 ">
          <motion.div
            className="w-fullbg-gray-800 w-full bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                Country Name:
                <input
                  type="text"
                  name="name"
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Enter country name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </label>
              <button
                className="bg-green-500 text-white py-2 px-5 rounded-lg items-center w-full"
                type="submit"
              >
                {id ? "Update Country" : "Add Country"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AddEditCountryPage;
