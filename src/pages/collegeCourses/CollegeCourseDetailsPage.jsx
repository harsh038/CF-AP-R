import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Header from "../../components/Header";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";

const CollegeCourseDetailsPage = () => {
  const { id } = useParams();
  const [collegeCourses, setCollegeCourses] = useState([]);
  const [collegeName, setCollegeName] = useState("");

  const fetchCollegeCourses = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/api/CollegeCourse/colleges/${id}`
      );
      const data = await response.json();
      setCollegeCourses(data);

      if (data.length > 0 && data[0]?.collegeModel?.name) {
        setCollegeName(data[0].collegeModel.name); // Set college name
      }
    } catch (error) {
      console.error("Error fetching college courses:", error);
      toast.error("Failed to fetch college courses");
    }
  };

  useEffect(() => {
    fetchCollegeCourses();
  }, [id]);

  // Delete a course using its ID
  const handleDelete = async (courseId) => {
    DeleteSweetAlert(
      "You won't be able to revert the Course from College!",
      async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/api/CollegeCourse/${courseId}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();

          if (data.foreignKey) {
            toast.error(
              "Delete dependent rows from CollegeCourse or Reviews table first"
            );
          } else {
            toast.success("Course deleted successfully");
            setCollegeCourses((prev) =>
              prev.filter((course) => course.collegeCourseID !== courseId)
            );
          }
        } catch (error) {
          toast.error("Error deleting the course");
          console.error("Error:", error);
        }
      }
    );
  };

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
        <Header title="Course Details" />
        <main className="max-w-6xl mx-auto py-6 px-4">
          <motion.div
            className="bg-gray-800 bg-opacity-80 shadow-xl rounded-xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold mb-4 text-white">
              {collegeName}
            </h1>

            {/* Render College Courses */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {collegeCourses.map((course) => (
                <motion.div
                  key={course.collegeCourseID}
                  className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700"
                  whileHover={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-xl font-semibold mb-2 text-blue-300">
                    {course.courseModel?.name || "Course Name"}
                  </h2>
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Branch Name: </strong>{" "}
                    {course.branchModel.branchName}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Seats Available:</strong> {course.seatAvailable}
                  </p>

                  <p className="text-sm text-gray-400 mb-4">
                    <strong>Fee:</strong> ₹{course.fee}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Admission Criteria:</strong>{" "}
                    {course.admissionCriteria}
                  </p>

                  <div className="flex justify-end gap-4">
                    <Link
                      to={`/admin/addeditcollegecourse/${course.collegeCourseID}`}
                      className="text-blue-500 hover:text-blue-300"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(course.collegeCourseID)}
                      className="text-red-500 hover:text-red-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default CollegeCourseDetailsPage;
