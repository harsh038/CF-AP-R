import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    passwordhash: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidationSchema = Yup.object({
    firstname: Yup.string().required("First name is required").max(100),
    lastname: Yup.string().required("Last name is required").max(100),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .max(200),
    passwordhash: Yup.string().required("Password is required").min(6).max(30),
  });

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch("http://localhost:5050/api/User");
      const users = await response.json();
      return users.some((user) => user.email === email);
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrors({ ...errors, email: "Email already exists." });
        return;
      }

      fetch("http://localhost:5050/api/User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("User registered successfully.");
          onSuccess();
        })
        .catch(() => {
          toast.error("Error registering user.");
        });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            name="passwordhash"
            value={formData.passwordhash}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          {errors.passwordhash && (
            <p className="text-red-500 text-sm">{errors.passwordhash}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
