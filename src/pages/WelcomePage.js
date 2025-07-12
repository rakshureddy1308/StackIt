import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";

const WelcomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState(null); // 'login' | 'register' | null

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/questions");
        console.log("Fetched questions:", res.data); // 👈 Add this
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 to-blue-400 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-indigo-600">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setView(null)}
        >
          StackIt
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => setView("login")}
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full hover:bg-indigo-100"
          >
            Login
          </button>
          <button
            onClick={() => setView("register")}
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full hover:bg-indigo-100"
          >
            Register
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="px-6 py-10">
        {view === "login" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Login inline />
          </motion.div>
        )}

        {view === "register" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Register inline />
          </motion.div>
        )}

        {!view && (
          <>
            <motion.h2
              className="text-3xl font-semibold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Explore Questions
            </motion.h2>

            {questions.length === 0 ? (
              <p className="text-center text-white text-lg">
                No questions found.
              </p>
            ) : (
              <div className="grid gap-6 max-w-3xl mx-auto">
                {questions.map((q) => (
                  <motion.div
                    key={q._id}
                    className="bg-white text-indigo-800 p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{q.title}</h3>
                    <p className="text-gray-700 mb-3">{q.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {q.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-600 px-2 py-1 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default WelcomePage;
