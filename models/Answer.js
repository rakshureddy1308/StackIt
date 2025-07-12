// models/Answer.js
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    text: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
