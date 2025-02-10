import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditCollegeCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [collegeDD, setCollegeDD] = useState([]);

  const [formData, setFormData] = useState({
    collegeID: "",
    name: "",
    fee: "",
    duration: "",
    seats: "",
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

  // Fetch college dropdown data
  useEffect(() => {
    fetchData("http://localhost:5050/api/College/CollegeDropDown").then(
      (data) => setCollegeDD(data)
    );
  }, []);

  // Fetch course data for editing
  useEffect(() => {
    if (id) {
      fetchData(`http://localhost:5050/api/CollegeCourse/${id}`).then(
        (courseData) => {
          setFormData({
            collegeID: courseData.collegeID,
            name: courseData.name,
            fee: courseData.fee,
            duration: courseData.duration,
            seats: courseData.seats,
          });
        }
      );
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation schema for Yup
  const validationSchema = Yup.object({
    collegeID: Yup.string().required("College is required"),
    name: Yup.string()
      .required("Course name is required")
      .max(100, "Course name must be less than 100 characters"),
    fee: Yup.number()
      .required("Fee is required")
      .min(0, "Fee must be a positive number"),
    duration: Yup.string().required("Duration is required"),
    seats: Yup.number()
      .required("Number of seats is required")
      .min(1, "At least 1 seat is required"),
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
      ? `http://localhost:5050/api/CollegeCourse/${id}`
      : `http://localhost:5050/api/CollegeCourse`;
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(
          id ? "Course updated successfully." : "Course added successfully."
        );
        navigate("/collegecourses");
      })
      .catch((error) => {
        toast.error(error.message || "Error adding course.");
        console.error("Error adding course:", error);
      });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={id ? "Edit Course" : "Add Course"} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {/* Course Fields */}
            <label className="flex flex-col gap-2">
              <span className="text-white">College:</span>
              <select
                name="collegeID"
                value={formData.collegeID}
                onChange={handleInputChange}
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select College</option>
                {collegeDD.map((college) => (
                  <option key={college.collegeID} value={college.collegeID}>
                    {college.name}
                  </option>
                ))}
              </select>
              {errors.collegeID && (
                <p className="text-red-600 text-sm">{errors.collegeID}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Course Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter course name"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Fee:</span>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                placeholder="Enter fee"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.fee && (
                <p className="text-red-600 text-sm">{errors.fee}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Duration:</span>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.duration && (
                <p className="text-red-600 text-sm">{errors.duration}</p>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-white">Seats:</span>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
                placeholder="Enter number of seats"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.seats && (
                <p className="text-red-600 text-sm">{errors.seats}</p>
              )}
            </label>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
            >
              {id ? "Update Course" : "Add Course"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AddEditCollegeCoursePage;
