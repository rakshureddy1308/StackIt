// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ inline }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => {
          navigate("/home"); // Always redirect to /home after login
        },
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message;
      if (errorMsg === "User not found") {
        toast.error("User not found, please register.");
      } else if (errorMsg === "Invalid credentials") {
        toast.error("Invalid password.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded text-black"
          required
        />

        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded text-black pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-indigo-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="bg-indigo-600 w-full py-2 text-white rounded hover:bg-indigo-700">
          Login
        </button>

        {!inline && (
          <p className="mt-4 text-sm text-center text-gray-600">
            New User?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register Here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
