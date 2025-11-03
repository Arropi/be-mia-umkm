const { getUserByEmail } = require("../repository/userRepository")

const getUserByEmailService =  async (email) => {
    try {
        const data = await getUserByEmail(email)
        if (!data) {
            throw Error('User not found', { cause: 'Not Found'})
        }
        const user =  {email: data.email, id: Number(data.id), username: data.username}
        return user
    } catch (error) {
        throw error
    }
}

module.exports={
    getUserByEmailService
}