import React, { useState } from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const tagOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "JWT", label: "JWT" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Express", label: "Express" },
];

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/questions",
        {
          title,
          description,
          tags: tags.map((t) => t.value),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Question posted successfully!");
      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          Ask a Question
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded mb-4"
          />

          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="mb-4"
          />

          <Select
            isMulti
            name="tags"
            options={tagOptions}
            className="mb-4"
            onChange={setTags}
            placeholder="Select tags"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Submit Question
          </button>
        </form>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AskQuestion;
