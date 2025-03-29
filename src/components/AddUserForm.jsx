import { useState } from "react";
import axios from "../api/axios";

const AddUserForm = ({ onClose, onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null); // File data for previewing

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request with JSON data only (no file upload)
      const response = await axios.post("/users", {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      // Create local preview of the avatar
      const newUser = {
        id: response.data.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        avatar: avatar
          ? URL.createObjectURL(avatar) // Generate local preview
          : "https://via.placeholder.com/150", // Fallback image
      };

      onAdd(newUser); // Add new user to the list
      alert("User added successfully!");
      onClose(); // Close form after success
    } catch (error) {
      alert("Failed to add user");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />

          {/* Upload Avatar */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full mb-2"
          />

          {/* Preview Avatar */}
          {avatar && (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-full mt-2"
            />
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
