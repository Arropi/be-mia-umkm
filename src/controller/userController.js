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
    const usersArray = req.body.users; // Expecting { users: [...] }
    if (!Array.isArray(usersArray)) {
      return res.status(400).json({
        message: 'Request body must contain "users" array',
      });
    }

    const bcrypt = require("bcryptjs");
    const { createUser, getUserByEmail, updateUser } = require("../repository/userRepository");
    const results = {
      created: [],
      updated: [],
      failed: [],
    };

    for (const userData of usersArray) {
      try {
        const { username, email, password, name, address, role, whatsapp } = userData;

        if (!email) {
          results.failed.push({
            data: userData,
            error: "Email is required",
          });
          continue;
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        // Hash password if provided
        let hashPassword = null;
        if (password) {
          const salt = await bcrypt.genSalt();
          hashPassword = await bcrypt.hash(password, salt);
        }

        if (existingUser) {
          // Update existing user
          const updatedUser = await updateUser(existingUser.id, {
            username: username || existingUser.username,
            name: name || existingUser.name,
            address: address || existingUser.address,
            whatsapp: whatsapp || existingUser.whatsapp,
            role: role || existingUser.role,
            ...(password && { password: hashPassword }),
          });
          results.updated.push(updatedUser);
        } else {
          // Create new user
          const newUser = await createUser(
            username,
            email,
            hashPassword ?? password,
            name,
            address,
            role,
            whatsapp
          );
          results.created.push(newUser);
        }
      } catch (error) {
        results.failed.push({
          data: userData,
          error: error.message,
        });
      }
    }

    return res.status(200).json({
      message: "Bulk upload users completed",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const user = req.user; // User from middleware

    // Check if user is admin or updating their own profile
    if (user.role !== 'admin' && user.id !== userId) {
      return res.status(403).json({
        message: 'Access denied. You can only update your own profile.'
      });
    }

    const updatedUser = await updateUserService(userId, userData);
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
