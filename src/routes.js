const { Router } = require('express')
const { authRoutes } = require('./api')

const routes = Router()

routes.get('/', (req, res) => {
    res.send('Hello World!')
})

routes.use(authRoutes)

module.exports = routes
