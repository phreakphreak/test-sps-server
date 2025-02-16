const { Sequelize } = require('sequelize')
const path = require('path')
const { USE_MEMORY_DB, DATABASE_STORAGE } = require('../../../../config/env')

class SequelizeClient {
    constructor() {
        this.type = USE_MEMORY_DB ? 'memory' : DATABASE_STORAGE
        if (!SequelizeClient.instance) {
            this.sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: USE_MEMORY_DB
                    ? ':memory:'
                    : path.join(
                          path.resolve(process.cwd()),
                          'db',
                          DATABASE_STORAGE
                      ),
                logging: false,
            })

            SequelizeClient.instance = this
        }
        return SequelizeClient.instance
    }

    getConnection() {
        return this.sequelize
    }

    async connect() {
        try {
            await this.sequelize.authenticate()
            console.log(`✅ Base de datos conectada: ${this.type}`)
        } catch (error) {
            console.error('❌ Error en la conexión SQLite:', error)
            process.exit(1)
        }
    }
}

module.exports = { SequelizeClient }
