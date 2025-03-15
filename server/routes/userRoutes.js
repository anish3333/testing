const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ✅ Existing GET route
router.get("/:id", userController.getUser);

// ✅ New POST route (accepts request body)
router.post("/", userController.createUser);

module.exports = router;
