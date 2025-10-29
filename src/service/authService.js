const { createUser, getUserByEmail } = require("../repository/userRepository")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerService = async (username, email, password) => {
    try {
        const existUser = await getUserByEmail(email)
        if (existUser ){
            throw Error('User has been registered', { cause: 'Bad Request'})
        }
        let hashPassword = null
        if( password ) {
            const salt = await bcrypt.genSalt()
            hashPassword = await bcrypt.hash(password, salt)
        }
        const user = await createUser(username, email, hashPassword?? password)
        const dataUser = { ...user, id: Number(user.id)}
        return dataUser
    } catch (error) {
        throw error
    }
}

const loginService = async (email, password) => {
    try {
        const existUser = await getUserByEmail(email)
        if (!existUser) {
            throw Error('User not found', { cause: 'Not Found'})
        }
        if (await bcrypt.compare(password, existUser.password)) {
            return {...existUser, id: Number(existUser.id)}
        } else {
            throw Error('Wrong password, try another password', {cause: 'Bad Request'})
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    loginService,
    registerService
}