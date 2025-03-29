import { useState } from "react";
import EditUserForm from "./EditUserForm";
import axios from "../api/axios";

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.first_name}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/users/${user.id}`);
      onDelete(user.id);
      alert(`${user.first_name} deleted successfully!`);
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-gray-200 w-full max-w-sm mx-auto">
      {isEditing ? (
        <EditUserForm
          user={user}
          onUpdate={onUpdate}
          closeForm={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex items-center gap-4 flex-wrap">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-purple-400 object-cover"
            />
            <div className="overflow-hidden">
              <h2 className="text-lg font-semibold text-gray-800 truncate w-40 md:w-56">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-500 truncate w-40 md:w-56">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex mt-4 gap-2 flex-wrap">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-pink-500 hover:to-purple-600 transition w-full sm:w-auto"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
