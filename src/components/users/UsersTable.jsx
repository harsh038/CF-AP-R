import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../common/DeleteSweetAlert";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/User");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const deleteUser = async (id) => {
    DeleteSweetAlert("You won't be able to revert the User!", async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/User?UserID=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          toast.error("Internal Server Error");
          return;
        }

        const data = await res.json();
        if (data.foreignKey) {
          toast.error(
            "User can't be deleted as it is associated with a ReviewTable",
            {
              className:
                "bg-red-950 text-white border border-red-400 rounded-xl",
            }
          );
        } else {
          toast.success("User Deleted Successfully", {
            className:
              "bg-green-950 text-white border border-green-400 rounded-xl",
          });

          setUsers((prev) => prev.filter((u) => u.userID !== id));
        }
      } catch (error) {
        console.error("Error deleting User:", error);
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    ({ firstName, lastName, email, passwordHash, role }) => {
      const term = searchTerm.toLowerCase();
      return (
        firstName.toLowerCase().includes(term) ||
        lastName.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term) ||
        passwordHash.toLowerCase().includes(term) ||
        role.toLowerCase().includes(term)
      );
    }
  );

  const getMaskedPassword = (passwordHash) => {
    return passwordHash && passwordHash.length > 4
      ? passwordHash.slice(0, 2) + "****" + passwordHash.slice(-2)
      : passwordHash;
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users List</h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search users"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <Link to={`/addedituser`}>
          <button className="text-white px-4 py-2 rounded-lg bg-blue-800 border border-blue-800 hover:border-blue-500">
            Add User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {[
                "No.",
                "First Name",
                "Last Name",
                "Email",
                "Password",
                "Role",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.userID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {getMaskedPassword(user.passwordHash)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/addedituser/${user.userID}`}>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteUser(user.userID)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default UsersTable;
