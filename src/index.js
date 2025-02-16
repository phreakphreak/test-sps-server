require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const { SequelizeClient } = require('./modules/shared/db/sequelize-client')
const { PORT } = require('../config/env')

const sequelizeClient = new SequelizeClient()

async function init() {
    try {
        await sequelizeClient.connect()
        await sequelizeClient.getConnection().sync()

        const app = express()
        app.use(express.json())
        app.use(cors())
        app.use(routes)
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error)
        process.exit(1)
    }
}

init()
