// routes/questions.js
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.get("/all", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("answers")
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
