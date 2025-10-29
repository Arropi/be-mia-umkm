const { loginService, registerService } = require("../service/authService")

const loginController = async (req, res) => {
    try {
        const data = req.body
        const user = await loginService(data.email, data.password)
        return res.status(200).json({
            'message': 'Login successfully',
            'data': user
        })
    } catch (error) {
        if(error.cause == 'Not Found') {
            return res.status(404).json({
                'message': error.message
            })
        } else if (error.cause == 'Bad Request') {
            return res.status(403).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': error.message
            })
        }
    }
}

const registerController = async (req, res) => {
    try {
        const data = req.body
        const user = await registerService(data.username, data.email, data.password)
        return res.status(201).json({
            'message': 'Register new user succesfully',
            'data': user
        })
    } catch (error) {
        if (error.cause == 'Bad Request') {
            return res.status(403).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': error.message
            })
        }
    }
}

module.exports = { registerController, loginController}