const {
  getUserByEmailService,
  getAllUsersService,
  deleteUserService,
  updateUserService,
} = require("../service/userService");

const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await getUserByEmailService(email);
    return res.status(200).json({
      message: "Getting data user with an email succesfully",
      data: user,
    });
  } catch (error) {
    if (error.cause == "Not Found") {
      return res.status(404).json({
        message: error.message,
      });
    } else {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json({
      message: "Getting all users succesfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = req.user; // User from middleware

    // Only admin or administrator can delete users
    if (!['admin', 'administrator'].includes(user.role)) {
      return res.status(403).json({
        message: 'Access denied. Only admin can delete users.'
      });
    }

    await deleteUserService(userId);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const bulkCreateUsers = async (req, res) => {
  try {
    console.log("Bulk create users request received");
    const usersArray = req.body.users; // Expecting { users: [...] }
    
    if (!usersArray) {
      console.error("No users array in request body");
      return res.status(400).json({
        message: 'Request body must contain "users" array',
      });
    }

    if (!Array.isArray(usersArray)) {
      console.error("Users is not an array:", typeof usersArray);
      return res.status(400).json({
        message: 'Request body must contain "users" array',
      });
    }

    console.log(`Processing ${usersArray.length} users`);

    const bcrypt = require("bcryptjs");
    const { createUser, getUserByEmail, updateUser } = require("../repository/userRepository");
    const results = {
      created: [],
      updated: [],
      failed: [],
    };

    for (let i = 0; i < usersArray.length; i++) {
      const userData = usersArray[i];
      try {
        const { username, email, password, name, address, role, whatsapp } = userData;

        if (!email) {
          results.failed.push({
            data: userData,
            error: "Email is required",
          });
          continue;
        }

        if (!username) {
          results.failed.push({
            data: userData,
            error: "Username is required",
          });
          continue;
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        // Hash password if provided, otherwise use default password
        let hashPassword;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          hashPassword = await bcrypt.hash(password, salt);
        } else {
          // Default password if not provided
          const salt = await bcrypt.genSalt(10);
          hashPassword = await bcrypt.hash("password123", salt);
        }

        if (existingUser) {
          // Update existing user
          const updateData = {
            username: username || existingUser.username,
            name: name !== undefined ? name : existingUser.name,
            address: address !== undefined ? address : existingUser.address,
            whatsapp: whatsapp !== undefined ? whatsapp : existingUser.whatsapp,
            role: role || existingUser.role,
          };
          
          // Only update password if provided
          if (password) {
            updateData.password = hashPassword;
          }
          
          const updatedUser = await updateUser(existingUser.id, updateData);
          results.updated.push({
            id: Number(updatedUser.id),
            email: updatedUser.email,
            username: updatedUser.username,
            name: updatedUser.name,
          });
        } else {
          // Create new user - password is required
          const newUser = await createUser(
            username,
            email,
            hashPassword,
            name || null,
            address || null,
            role || "admin_umkm",
            whatsapp || null
          );
          results.created.push({
            id: Number(newUser.id),
            email: newUser.email,
            username: newUser.username,
            name: newUser.name,
          });
        }
      } catch (error) {
        console.error(`Error processing user ${i + 1}:`, error);
        results.failed.push({
          data: userData,
          error: error.message || error.toString() || "Unknown error",
        });
      }
    }

    console.log(`Bulk upload completed: ${results.created.length} created, ${results.updated.length} updated, ${results.failed.length} failed`);

    return res.status(200).json({
      message: "Bulk upload users completed",
      data: results,
    });
  } catch (error) {
    console.error("Bulk create users error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message || error.toString(),
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userFromToken = req.user; // User from middleware
    const userData = req.body;
    let targetUserId;

    // If /:id is present, use it. Otherwise, it's /profile, so use token user's id.
    if (req.params.id) {
      targetUserId = parseInt(req.params.id, 10);
    } else {
      targetUserId = userFromToken.id;
    }

    const isAdmin = ['admin', 'administrator'].includes(userFromToken.role);
    const isUpdatingOwnProfile = userFromToken.id === targetUserId;

    // Admin can update anyone. Others can only update themselves.
    if (!isAdmin && !isUpdatingOwnProfile) {
      return res.status(403).json({
        message: "Access denied. You can only update your own profile."
      });
    }

    const updatedUser = await updateUserService(targetUserId, userData);
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    // It's good practice to check for specific error types if possible
    if (error.message.includes("not found")) { // Example check
        return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: error.message || "An internal server error occurred",
    });
  }
};

const checkUserExists = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }

    const { getUserByEmailService } = require("../service/userService");
    const user = await getUserByEmailService(email);

    return res.status(200).json({
      message: "User exists",
      data: { exists: true, email: email },
    });
  } catch (error) {
    // User not found, which means doesn't exist
    if (error.cause === "Not Found") {
      return res.status(200).json({
        message: "User does not exist",
        data: { exists: false, email: req.query.email },
      });
    } else {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

module.exports = { getUserByEmail, getAllUsers, deleteUser, updateUser, bulkCreateUsers, checkUserExists };
