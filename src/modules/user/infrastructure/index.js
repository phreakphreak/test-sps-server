const { SequelizeUserRepository } = require('./sequelize.user.repository')
const userRepository = new SequelizeUserRepository()

module.exports = {
    userRepository,
}
