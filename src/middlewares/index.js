const { authService } = require('../modules/auth')
const { User } = require('../modules/user/domain/user.model')
const { UserNotFoundError } = require('../modules/shared/errors')

const validateContentType = (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res
            .status(400)
            .json({ message: 'Content-Type debe ser application/json' })
    }
    next()
}

const validateJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: 'Token  must be provided' })
    }
    const tokenParts = authHeader.split(' ')
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'token format invalid' })
    }
    const token = tokenParts[1]

    try {
        req.user = await authService.verifyToken(token)
        next()
    } catch (error) {
        console.log(error)
        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: error.message })
        }
        return res.status(401).json({ message: 'Token expired' })
    }
}

const validateIsAdmin = (req, res, next) => {
    const user = new User(req.user)
    if (!user.isAdmin()) {
        return res
            .status(403)
            .json({ message: 'Unauthorized: Admin access required' })
    }
    next()
}

module.exports = {
    validateContentType,
    validateJWT,
    validateIsAdmin,
}
