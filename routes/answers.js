// routes/answers.js
const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

// GET answers for a specific question
router.get("/:questionId", async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching answers" });
  }
});

// POST an answer
router.post("/", async (req, res) => {
  const { questionId, content, author } = req.body;
  try {
    const newAnswer = new Answer({ questionId, content, author });
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(400).json({ message: "Error saving answer" });
  }
});

module.exports = router;
