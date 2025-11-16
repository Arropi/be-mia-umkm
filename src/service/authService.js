const { createUser, getUserByEmail } = require("../repository/userRepository")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
};

const registerService = async (username, email, password) => {
    try {
        const existUser = await getUserByEmail(email)
        console.log(existUser)
        if (existUser){
            throw Error('User has been registered', { cause: 'Bad Request'})
        }
        let hashPassword = null
        if( password ) {
            const salt = await bcrypt.genSalt()
            hashPassword = await bcrypt.hash(password, salt)
        }
        const user = await createUser(username, email, hashPassword?? password)
        const dataUser = { ...user, id: Number(user.id)}

        // Generate token after successful registration
        const token = generateToken(dataUser);
        return { ...dataUser, token };
    } catch (error) {
        throw error
    }
}

const loginService = async (email, password, username) => {
    try {
        const existUser = await getUserByEmail(email)
        if (!existUser) {
            throw Error('User not found', { cause: 'Not Found'})
        }
        if(email && password) {
            if (await bcrypt.compare(password, existUser.password)) {
                const userWithId = {...existUser, id: Number(existUser.id)}
                const token = generateToken(userWithId);
                return { ...userWithId, token };
            } else {
                throw Error('Wrong password, try another password', {cause: 'Bad Request'})
            }
        } else if( email === existUser.email && username === existUser.username) {
            const userWithId = {...existUser, id: Number(existUser.id)}
            const token = generateToken(userWithId);
            return { ...userWithId, token };
        } else {
            throw Error('Invalid request form', { cause: 'Bad Request'})
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    loginService,
    registerService
}