const prisma = require('../config/dbConfig')

const createUser = async (username, email, password) => {
    try {
        const user = await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: password,
                created_at: new Date()
            }
        })
        return user
    } catch (error) {
        console.log('Create User Repository User', error)
        throw Error ('Database Server Error Dalam Membuat User')
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await prisma.users.findUnique({ where: { email: email}})
        return user
    } catch (error) {
        console.log('Create User Repository User', error)
        throw Error ('Database Server Error Dalam Mencari User')
    }
}

module.exports = { 
    getUserByEmail, 
    createUser
}