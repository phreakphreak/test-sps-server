const { Router } = require('express')
const { authRoutes, userRoutes } = require('./api')

const routes = Router()

routes.get('/', (req, res) => {
    res.send('Hello World!')
})

routes.use(authRoutes)
routes.use(userRoutes)

module.exports = routes
