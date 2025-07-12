// src/components/AnswerForm.js
import React, { useState } from "react";
import axios from "axios";

const AnswerForm = ({ questionId, onAnswerAdded }) => {
  const [answer, setAnswer] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || !author.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/answers", {
        questionId,
        content: answer,
        author,
      });
      setAnswer("");
      setAuthor("");
      onAnswerAdded(); // refetch after adding
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded text-sm"
        required
      />
      <textarea
        rows="2"
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded text-sm"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default AnswerForm;
