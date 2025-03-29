import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold py-3 rounded-md hover:from-pink-500 hover:to-purple-600 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
