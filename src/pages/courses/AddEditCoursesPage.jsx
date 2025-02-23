import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
  });
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5050/api/Course/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setFormData({
            name: data.name,
            duration: data.duration,
          });
        })
        .catch((error) => {
          toast.error("Error fetching user data.");
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidationSchema = Yup.object({
    name: Yup.string()
      .required("First name is required")
      .max(100, "First name must be less than 100 characters"),
    duration: Yup.string()
      .required("Last name is required")
      .max(100, "Last name must be less than 100 characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      //abortEarly:true---->return from validation on the first error rather than after all validations complete
    } catch (error) {
      // console.log(error.inner);
      // error.inner is an array of errors
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }
    if (id) {
      fetch(`http://localhost:5050/api/Course/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("User updated successfully.", {
            className:
              " bg-green-950 text-white border  border border-green-400  rounded-xl ",
          });
          navigate("/courses");
        })
        .catch((error) => {
          toast.error("Error updating user.", {
            className:
              " bg-red-950 text-white border  border border-red-400  rounded-xl ",
          });
          console.error("Error updating user:", error);
        });
    } else {
      fetch("http://localhost:5050/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("User added successfully.", {
            className:
              " bg-green-950 text-white border  border border-green-400  rounded-xl ",
          });
          navigate("/courses");
        })
        .catch((error) => {
          toast.error("Error adding user.", {
            className:
              " bg-red-950 text-white border  border border-red-400  rounded-xl ",
          });
          console.error("Error adding user:", error);
        });
    }
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        {id ? <Header title="Edit Course" /> : <Header title="Add Course" />}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                First Name:
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter first name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && ( //if errors.firstname is true then show the error message
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                duration :
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter last name"
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
                {errors.duration && (
                  <span className="text-red-600 text-sm">
                    {errors.duration}
                  </span>
                )}
              </label>

              {/* add submit button */}
              <button
                className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
                type="submit"
              >
                {id ? "Update Course" : "Add Course"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};
export default AddEditCoursePage;
