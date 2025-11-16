const { getUserByEmail, getAllUsers, deleteUser, updateUser } = require("../repository/userRepository");

const getUserByEmailService = async (email) => {
  try {
    const data = await getUserByEmail(email);
    if (!data) {
      throw Error("User not found", { cause: "Not Found" });
    }
    const user = {
      email: data.email,
      id: Number(data.id),
      username: data.username,
      name: data.name,
      address: data.address,
      role: data.role,
    };
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsersService = async () => {
  try {
    const users = await getAllUsers();
    return users.map((user) => ({
      email: user.email,
      id: Number(user.id),
      username: user.username,
      name: user.name,
      address: user.address,
      role: user.role,
      created_at: user.created_at,
    }));
  } catch (error) {
    throw error;
  }
};

const deleteUserService = async (userId) => {
  try {
    await deleteUser(userId);
    return true;
  } catch (error) {
    throw error;
  }
};

const updateUserService = async (userId, userData) => {
  try {
    // Hash password if provided
    if (userData.password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const updatedUser = await updateUser(userId, userData);
    return {
      email: updatedUser.email,
      id: Number(updatedUser.id),
      username: updatedUser.username,
      name: updatedUser.name,
      address: updatedUser.address,
      whatsapp: updatedUser.whatsapp,
      role: updatedUser.role,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserByEmailService,
  getAllUsersService,
  deleteUserService,
  updateUserService,
};
