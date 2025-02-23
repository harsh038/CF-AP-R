import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    passwordhash: "",
    role: "",
  });
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5050/api/User/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
            passwordhash: data.passwordHash,
            role: data.role,
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
    firstname: Yup.string()
      .required("First name is required")
      .max(100, "First name must be less than 100 characters"),
    lastname: Yup.string()
      .required("Last name is required")
      .max(100, "Last name must be less than 100 characters"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .max(200, "Email must be less than 200 characters"),
    passwordhash: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be less than 30 characters"),
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
      fetch(`http://localhost:5050/api/User/${id}`, {
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
          navigate("/users");
        })
        .catch((error) => {
          toast.error("Error updating user.", {
            className:
              " bg-red-950 text-white border  border border-red-400  rounded-xl ",
          });
          console.error("Error updating user:", error);
        });
    } else {
      fetch("http://localhost:5050/api/User", {
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
          navigate("/users");
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
        {id ? <Header title="Edit User" /> : <Header title="Add User" />}
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
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                {errors.firstname && ( //if errors.firstname is true then show the error message
                  <span className="text-red-600 text-sm">
                    {errors.firstname}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                Last Name:
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter last name"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                {errors.lastname && (
                  <span className="text-red-600 text-sm">
                    {errors.lastname}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                Email:
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">{errors.email}</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                Password:
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter password"
                  type="password"
                  name="passwordhash"
                  value={formData.passwordhash}
                  onChange={handleInputChange}
                />
                {errors.passwordhash && (
                  <span className="text-red-600 text-sm">
                    {errors.passwordhash}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                Role:
                <select
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
                {errors.role && (
                  <span className="text-red-600 text-sm">{errors.role}</span>
                )}
              </label>
              {/* add submit button */}
              <button
                className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
                type="submit"
              >
                {id ? "Update User" : "Add User"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};
export default AddEditUserPage;
