const { Router } = require('express')
const { authService } = require('../../modules/auth')
const { validateContentType, validateJWT } = require('../../middlewares')
const routes = Router()

routes.post('/auth/login', validateContentType, async (req, res) => {
    const { email, password } = req.body
    try {
        const { token, user } = await authService.authenticate(email, password)
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

routes.get('/world', validateJWT, async (req, res) => {
    try {
        res.status(200).json({ message: 'Hello World!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = routes
