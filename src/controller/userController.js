const { getUserByEmailService } = require("../service/userService")

const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email
        const user = await getUserByEmailService(email)
        return res.status(200).json({
            'message': 'Getting data user with an email succesfully',
            'data': user
        })
    } catch (error) {
        if (error.cause == 'Not Found') {
            return res.status(404).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': error.message
            })
        }
    }
}

module.exports = { getUserByEmail }