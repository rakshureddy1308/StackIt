// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WelcomePage from "./pages/WelcomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { isLoggedIn } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* ✅ Place ToastContainer here so it's visible across all pages */}
      <ToastContainer position="top-center" autoClose={1500} />
    </Router>
  );
}

export default App;
