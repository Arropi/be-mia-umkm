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

// Specific endpoint for users to update their own profile
route.put("/profile", authenticateToken, updateUser);

// Admin can update any user, admin_umkm and other authenticated users can update their own profile
route.put("/:id", authenticateToken, authorizeAdminUmkm, updateUser);

// Only admin can delete users
route.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);

module.exports = route;
