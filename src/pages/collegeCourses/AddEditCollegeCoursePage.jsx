import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddEditCollegeCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [collegeDD, setCollegeDD] = useState([]);
  const [courseDD, setCourseDD] = useState([]);
  const [branchDD, setBranchDD] = useState([]);
  const [formData, setFormData] = useState({
    collegeID: "",
    courseID: "",
    branchID: "",
    fee: "",
    seatAvailable: "",
    admissionCriteria: "",
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
      fetch(`http://localhost:5050/api/CollegeCourse/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            collegeID: data.collegeID,
            collegeName: data.collegeModel.name,
            courseID: data.courseID,
            courseName: data.courseModel.name,
            branchID: data.branchID,
            branchName: data.branchModel.branchName,
            fee: data.fee,
            seatAvailable: data.seatAvailable,
            admissionCriteria: data.admissionCriteria,
          });
          LoadBranchDD(data.courseID);
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchData(
          "http://localhost:5050/api/Course/CourseDropDown"
        );
        setCourseDD(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  function LoadBranchDD(courseID) {
    const token = localStorage.getItem("token"); // Adjust if token is stored elsewhere

    if (courseID > 0) {
      fetch(`http://localhost:5050/api/Branch/branchDropDown/${courseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setBranchDD)
        .catch(() => setBranchDD([]));
    } else {
      setBranchDD([]);
    }
  }

  useEffect(() => {
    fetchData("http://localhost:5050/api/College/OnlyCollegeDropDown").then(
      (data) => {
        setCollegeDD(data);
      }
    );
  }, []);
  const handleInputChange = (e) => {
    if (e.target.name === "courseID") {
      LoadBranchDD(e.target.value);
    }
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Validation Schema for form Data
  const validationSchema = Yup.object({
    collegeID: Yup.string().required("College ID is required"),
    courseID: Yup.string().required("Course ID is required"),
    branchID: Yup.string().required("Branch ID is required"),
    fee: Yup.string().required("Fee is required"),
    seatAvailable: Yup.number("Seat Available must be a number").required(
      "Seat Available is required"
    ),
    admissionCriteria: Yup.string().required("Admission Criteria is required"),
  });

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

    // Send the request to add/update syllabus
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.duplication) {
          toast.error("Branch is already exist in that course of college", {
            className:
              " bg-red-950 text-white border  border border-red-400  rounded-xl ",
          });
        } else {
          toast.success(
            id
              ? "College's Course updated successfully."
              : "Courese of college added successfully.",
            {
              className:
                " bg-green-950 text-white border  border border-green-400  rounded-xl ",
            }
          );
        }
        navigate(-1);
      })
      .catch((error) => {
        toast.error(error.message || "Error adding College-Course.", {
          className:
            " bg-red-950 text-white border  border border-red-400  rounded-xl ",
        });
        console.error("Error adding College-Course:", error);
      });
  };
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        {id ? (
          <Header title="Edit College-Course" />
        ) : (
          <Header title="Add College-Course" />
        )}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2">
                College Name:
                <select
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  name="collegeID"
                  value={formData.collegeID}
                  onChange={handleInputChange}
                >
                  <option value="">Select College</option>
                  {collegeDD.map((college) => (
                    <option key={college.collegeID} value={college.collegeID}>
                      {college.name}
                    </option>
                  ))}
                </select>
                {errors.collegeID && (
                  <span className="text-red-600 text-sm">
                    {errors.collegeID}
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
                Branch Name:
                <select
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  name="branchID"
                  value={formData.branchID}
                  onChange={handleInputChange}
                  disabled={!formData.courseID}
                >
                  <option value="">Select Branch</option>
                  {branchDD.map((branch) => (
                    <option key={branch.branchID} value={branch.branchID}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
                {errors.branchID && (
                  <span className="text-red-600 text-sm">
                    {errors.branchID}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                fee:
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleInputChange}
                />
                {errors.fee && (
                  <span className="text-red-600 text-sm">{errors.fee}</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                seatAvailable:
                <input
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter seatAvailable"
                  name="seatAvailable"
                  value={formData.seatAvailable}
                  onChange={handleInputChange}
                />
                {errors.seatAvailable && (
                  <span className="text-red-600 text-sm">
                    {errors.seatAvailable}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                admissionCriteria:
                <textarea
                  className="
                    bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400
                    "
                  placeholder="Enter admissionCriteria"
                  name="admissionCriteria"
                  value={formData.admissionCriteria}
                  onChange={handleInputChange}
                />
                {errors.admissionCriteria && (
                  <span className="text-red-600 text-sm">
                    {errors.admissionCriteria}
                  </span>
                )}
              </label>

              <button
                className="bg-green-500 text-white py-2 px-5 rounded-lg items-center"
                type="submit"
              >
                {id ? "Update CollegeCourse" : "Add CollegeCourse"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AddEditCollegeCoursePage;
