import { motion } from "framer-motion";
import { Edit, Search, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../common/DeleteSweetAlert";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    fetch("http://localhost:5050/api/User")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching Syllabus:", error));
  }, []);

  const deleteUser = (id) => {
    DeleteSweetAlert("You won't be able to revert the User!", () => {
      fetch(`http://localhost:5050/api/User?UserID=${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            toast.error("Internal Server Error");
          }
        })
        .then((data) => {
          if (data.foreignKey) {
            toast.error(
              "User can't be deleted as it is associated with a ReviewTable",
              {
                className:
                  " bg-red-950 text-white border  border border-red-400  rounded-xl ",
              }
            );
          } else {
            toast.success("User Deleted Successfully", {
              className:
                " bg-green-950 text-white border  border border-green-400  rounded-xl ",
            });
            setUsers(users.filter((u) => u.userID !== id));
            setFilteredUsers(
              filteredUsers.filter((user) => user.userID !== id)
            );
          }
        })
        .catch((error) => console.error("Error deleting User:", error));
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.passwordHash.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const getMaskedPassword = (passwordHash) => {
    if (passwordHash && passwordHash.length > 4) {
      return passwordHash.slice(0, 2) + "****" + passwordHash.slice(-2);
    }
    return passwordHash;
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
            placeholder="search users"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 px-40 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Link to={`/addedituser`}>
          <button className=" text-white  px-4 py-2 rounded-lg bg-blue-800  border hover:border-blue-500 border-blue-800">
            Add User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                firstname
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                lastname
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                PasswordHash
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
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
                  {"  "}
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
