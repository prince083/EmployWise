import { useState } from "react";
import axios from "../api/axios";

const EditUserForm = ({ user, onUpdate, closeForm }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      onUpdate(user.id, {
        ...user,
        first_name: response.data.first_name || firstName,
        last_name: response.data.last_name || lastName,
        email: response.data.email || email,
      });

      alert("User updated successfully!");
      closeForm();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-3 mb-4 w-full rounded-lg shadow-sm"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-3 mb-4 w-full rounded-lg shadow-sm"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 mb-4 w-full rounded-lg shadow-sm"
      />
      <div className="flex justify-end gap-4">
        {/* Save Button */}
        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
        >
          Save
        </button>
        {/* Cancel Button */}
        <button
          type="button"
          onClick={closeForm}
          className="px-6 py-2 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
