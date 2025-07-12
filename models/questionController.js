const Question = require("../models/Question");
const jwt = require("jsonwebtoken");

exports.createQuestion = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newQuestion = new Question({
      ...req.body,
      user: decoded.id,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};
