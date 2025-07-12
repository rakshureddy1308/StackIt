const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register); // ✅ route exists
router.post("/login", login); // ✅ route exists

module.exports = router;
