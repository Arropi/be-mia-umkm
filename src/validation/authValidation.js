const {z, ZodError} = require('zod')
const authValidation = async(req, res, next)=>{
    try {
        const username = z
        .string({
            error: (iss) =>
            iss.input === undefined
                ? "Field Username Cannot Be Empty"
                : "Invalid input on username",
        })
        .parse(req.body.username);
        const email = z
        .email({
            error: (iss) =>
            iss.input === undefined
                ? "Field Email Cannot Be Empty"
                : "Invalid input on email",
        })
        .parse(req.body.email);
        const password = z.string('Invalid input on password').min(8, "Length password not valid").optional().parse(req.body.password)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                'message': error.issues[0].message
            })
            } else {
            res.status(500).json({
                'message': error.message
            })
        }
    }
}

const authLogin = async (req, res, next) => {
    try {
        const username = z
        .string('Invalid input on username').optional().parse(req.body.username)
        const email = z
        .email({
            error: (iss) =>
            iss.input === undefined
                ? "Field Email Cannot Be Empty"
                : "Invalid input on email",
        })
        .parse(req.body.email);
        const password = z.string('Invalid input on password').min(8, "Length password not valid").optional().parse(req.body.password)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                'message': error.issues[0].message
            })
            } else {
            res.status(500).json({
                'message': error.message
            })
        }
    }
}

module.exports = { authValidation, authLogin}