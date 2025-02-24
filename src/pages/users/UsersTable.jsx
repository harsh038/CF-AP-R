import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import DeleteSweetAlert from "../../components/DeleteSweetAlert";
import ReusableTable from "../../components/ReusableTable";
import { motion } from "framer-motion";

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
          toast.error("User can't be deleted as it is associated with a ReviewTable", {
            className: "bg-red-950 text-white border border-red-400 rounded-xl",
          });
        } else {
          toast.success("User Deleted Successfully", {
            className: "bg-green-950 text-white border border-green-400 rounded-xl",
          });
          setUsers((prev) => prev.filter((u) => u.userID !== id));
        }
      } catch (error) {
        console.error("Error deleting User:", error);
      }
    });
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
    <ReusableTable
      columns={["No.", "First Name", "Last Name", "Email", "Password", "Role", "Actions"]}
      data={filteredUsers}
      searchTerm={searchTerm}
      handleSearch={(e) => setSearchTerm(e.target.value)}
      addButtonLabel="Add User"
      addButtonLink="/addedituser"
      tableName="Users List"
    >
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
    </ReusableTable>
  );
}

export default UsersTable;