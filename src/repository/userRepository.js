const prisma = require("../config/dbConfig");

const createUser = async (username, email, password, name = null, address = null, role = "admin_umkm", whatsapp = null) => {
  try {
    const user = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: password,
        name: name,
        address: address,
        whatsapp: whatsapp,
        role: role,
        created_at: new Date(),
      },
    });
    return user;
  } catch (error) {
    console.log("Create User Repository User", error);
    throw Error("Database Server Error Dalam Membuat User");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.users.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    console.log("Create User Repository User", error);
    throw Error("Database Server Error Dalam Mencari User");
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return users;
  } catch (error) {
    console.log("Get All Users Repository Error", error);
    throw Error("Database Server Error Dalam Mengambil Semua User");
  }
};

const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { id: BigInt(userId) },
      data: {
        ...userData,
        updated_at: new Date(),
      },
    });
    return updatedUser;
  } catch (error) {
    console.log("Update User Repository Error", error);
    throw Error("Database Server Error Dalam Update User");
  }
};

const deleteUser = async (userId) => {
  try {
    await prisma.users.delete({
      where: { id: BigInt(userId) },
    });
    return true;
  } catch (error) {
    console.log("Delete User Repository Error", error);
    throw Error("Database Server Error Dalam Menghapus User");
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
};
