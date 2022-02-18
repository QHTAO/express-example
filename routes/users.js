const express = require("express");
const users = require("../controllers/users");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", authMiddleware, users.getUsers);
router.post("/login", users.login);

module.exports = router;
