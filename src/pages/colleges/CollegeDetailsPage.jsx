import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Header from "../../components/Header";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";

const CollegeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5050/api/College/${id}`)
      .then((res) => res.json())
      .then((data) => setCollege(data))
      .catch((error) => console.error("Error fetching college:", error));
  }, [id]);

  const deleteCollege = () => {
    DeleteSweetAlert("You won't be able to revert the College!", () => {
      fetch(`http://localhost:5050/api/College/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.foreignKey) {
            toast.error(
              "Delete dependent rows from CollegeCourse or Reviews table first"
            );
            navigate("/admin/colleges");
          } else {
            toast.success("College deleted successfully");
            navigate("/admin/colleges");
          }
        })
        .catch((error) => {
          toast.error("Error deleting college");
          console.error("Error deleting college:", error);
        });
    });
  };
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
        <Header title="College Details" />
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-80 shadow-xl rounded-xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {college ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-white mb-4">
                  {college.name}
                </h2>

                {/* College Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div className="space-y-2">
                    <p className="font-semibold">City:</p>
                    <p className="text-sm">
                      {college.cityModel?.name || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Type:</p>
                    <p className="text-sm">{college.type}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Establishment Year:</p>
                    <p className="text-sm">{college.establishmentYear}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Address :</p>
                    <p className="text-sm">{college.address}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Website:</p>
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {college.website}
                    </a>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <p className="font-semibold text-gray-300">Description:</p>
                  <p className="text-sm text-gray-400">{college.description}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-start gap-4 mt-6">
                  <Link to={`/admin/addeditcollege/${college.collegeID}`}>
                    <button className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                      <Edit className="mr-2" /> Edit
                    </button>
                  </Link>
                  <button
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => {
                      deleteCollege();
                    }}
                  >
                    <Trash2 className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default CollegeDetailsPage;
