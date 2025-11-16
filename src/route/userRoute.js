const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  authorizeAdminUmkm
} = require("../middleware/auth");
const {
  getUserByEmail,
  getAllUsers,
  deleteUser,
  updateUser,
  bulkCreateUsers,
  checkUserExists
} = require("../controller/userController");
const route = express.Router();

// Public endpoint to check if user exists (for login verification)
route.get("/check", checkUserExists);

// Only authenticated users can get their own profile (with email in query)
route.get("/", authenticateToken, getUserByEmail);

// Only admin can get all users
route.get("/all", authenticateToken, authorizeAdmin, getAllUsers);

// Only admin can bulk create users
route.post("/bulk", authenticateToken, authorizeAdmin, bulkCreateUsers);

// Only admin can update any user, or users can update themselves (would need to check in controller)
route.put("/:id", authenticateToken, authorizeAdmin, updateUser);

// Only admin can delete users
route.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);

module.exports = route;
