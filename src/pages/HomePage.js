// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/questions/all");
        console.log("Fetched questions:", res.data);
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">StackIt</h1>
        <nav className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-600 hover:underline font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-indigo-600 hover:underline font-medium"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Body */}
      <main className="px-6 py-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Questions
        </h2>

        {questions.length === 0 ? (
          <p className="text-gray-500">No questions available yet.</p>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  {q.title}
                </h3>
                <p className="text-gray-700 mb-2">{q.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {q.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Answers */}
                {q.answers?.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    <p className="font-semibold text-gray-800">Answers:</p>
                    {q.answers.map((ans, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 p-3 rounded text-sm text-gray-700"
                      >
                        {ans.text} — <i>{ans.author}</i>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">No answers yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
