import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditBranchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [courseDD, setCourseDD] = useState([]);
  const [formData, setFormData] = useState({
    courseID: "",
    branchName: "",
    content: "",
    about: "",
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
      fetchData(`http://localhost:5050/api/Branch/${id}`).then((data) => {
        setFormData({
          courseID: data.courseID,
          branchName: data.branchName,
          content: data.content,
          about: data.about,
        });
      });
    }
  }, [id]);

  useEffect(() => {
    fetchData("http://localhost:5050/api/Course/CourseDropDown").then(
      (data) => {
        setCourseDD(data);
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidationSchema = Yup.object({
    courseID: Yup.string().required("Course is required"),
    branchName: Yup.string().required("Branch name is required"),
    content: Yup.string().required("Content is required"),
    about: Yup.string().required("About is required"),
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
      ? `http://localhost:5050/api/Branch/${id}`
      : `http://localhost:5050/api/Branch`;
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.duplication) {
          toast.error("Branch is already associatred with course ", {
            className:
              " bg-red-950 text-white border  border border-red-400  rounded-xl ",
          });
        } else {
          toast.success(
            id ? "Branch updated successfully." : "Branch added successfully.",
            {
              className:
                " bg-green-950 text-white border  border border-green-400  rounded-xl ",
            }
          );
        }
        navigate("/branches");
      })
      .catch((error) => {
        toast.error(error.message || "Error adding Branch.", {
          className:
            " bg-red-950 text-white border  border border-red-400  rounded-xl ",
        });
        console.error("Error adding Branch:", error);
      });
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        {id ? <Header title="Edit Branch" /> : <Header title="Add Branch" />}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                Branch Name:
                <input
                  type="text"
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter state name"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                />
                {errors.branchName && (
                  <span className="text-red-600 text-sm">
                    {errors.branchName}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                Course Name:
                <select
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  name="courseID"
                  value={formData.courseID}
                  onChange={handleInputChange}
                >
                  <option value="">Select Course</option>
                  {courseDD.map((course) => (
                    <option key={course.courseID} value={course.courseID}>
                      {course.name}
                    </option>
                  ))}
                </select>
                {errors.courseID && (
                  <span className="text-red-600 text-sm">
                    {errors.courseID}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                About :
                <input
                  type="text"
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter About"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                />
                {errors.about && (
                  <span className="text-red-600 text-sm">{errors.about}</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                Content :
                <input
                  type="text"
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter Content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                />
                {errors.content && (
                  <span className="text-red-600 text-sm">{errors.content}</span>
                )}
              </label>
              <button
                className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
                type="submit"
              >
                {id ? "Update Branch" : "Add Branch"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AddEditBranchPage;
