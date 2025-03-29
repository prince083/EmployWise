import { useEffect, useState } from "react";
import axios from "../api/axios";
import UserCard from "../components/UserCard";
import AddUserForm from "../components/AddUserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      alert("Failed to load users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleUpdate = async (id, updatedUser) => {
    try {
      const response = await axios.put(`/users/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data : user))
      );
      alert("User updated successfully!");
    } catch (error) {
      alert("Failed to update user");
    }
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [
      {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
      ...prevUsers,
    ]);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          User List
        </h1>

        {/* User Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
            }`}
          >
            Next
          </button>
        </div>

        {/* Floating "+" Button */}
        <button
          onClick={() => setIsAdding(true)}
          className="fixed bottom-8 left-8 bg-gradient-to-r from-red-500 to-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:from-red-600 hover:to-red-800"
        >
          +
        </button>

        {/* Show Add User Form */}
        {isAdding && (
          <AddUserForm
            onClose={() => setIsAdding(false)}
            onAdd={handleAddUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
