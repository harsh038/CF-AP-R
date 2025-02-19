import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Header from "../../components/common/Header";
import DeleteSweetAlert from "../../components/common/DeleteSweetAlert";

const BranchDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5050/api/Branch/${id}`)
      .then((res) => res.json())
      .then((data) => setBranch(data))
      .catch((error) => console.error("Error fetching Branch:", error));
  }, [id]);

  const deleteBranches = (id) => {
    DeleteSweetAlert("You won't be able to revert the Branches!", () => {
      fetch(`http://localhost:5050/api/Branch/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            toast.success("Branches Deleted Successfully", {
              className:
                "bg-green-950 text-white border border-green-400 rounded-xl",
            });
          } else {
            toast.error("Internal Server Error");
          }
          navigate('/branches')
        })
        .catch((error) => console.error("Error deleting Branches:", error));
    });
  };

  // const deleteBranch = () => {
  //   DeleteSweetAlert("You won't be able to revert the Branch!", () => {
  //     fetch(`http://localhost:5050/api/Branch/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.foreignKey) {
  //           toast.error(
  //             "Delete dependent rows from BranchCourse or Reviews table first"
  //           );
  //           navigate("/branches");
  //         } else {
  //           toast.success("Branch deleted successfully");
  //           navigate("/branches");
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error("Error deleting Branch");
  //         console.error("Error deleting Branch:", error);
  //       });
  //   });
  // };
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
        <Header title="Branch Details" />
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-80 shadow-xl rounded-xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {branch ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-white mb-4">
                  {branch.branchName}
                </h2>

                {/* Branch Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div className="space-y-2">
                    <p className="font-semibold">Course Name:</p>
                    <p className="text-sm">{branch.courseModel?.name || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Type:</p>
                    <p className="text-sm">{branch.type}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Rating:</p>
                    <p className="text-sm">{branch.rating}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Website:</p>
                    <a
                      href={branch.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {branch.website}
                    </a>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <p className="font-semibold text-gray-300">Description:</p>
                  <p className="text-sm text-gray-400">{branch.description}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-start gap-4 mt-6">
                  <Link to={`/addeditbranch/${branch.branchID}`}>
                    <button className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                      <Edit className="mr-2" /> Edit
                    </button>
                  </Link>
                  <button
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => {
                      deleteBranches();
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

export default BranchDetailsPage;
