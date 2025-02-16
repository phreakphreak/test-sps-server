const { authService } = require('../modules/auth')
const validateContentType = (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res
            .status(400)
            .json({ message: 'Content-Type debe ser application/json' })
    }
    next()
}

const validateJWT = (req, res, next) => {
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
        const decoded = authService.verifyToken(token).user
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token expired' })
    }
}

module.exports = {
    validateContentType,
    validateJWT,
}
