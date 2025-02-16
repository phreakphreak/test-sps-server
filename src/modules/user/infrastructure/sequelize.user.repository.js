const { UserRepository } = require('../domain/user.repository')
const { UserModel } = require('./sequelize.user.model')
const { User } = require('../domain/user.model')

class SequelizeUserRepository extends UserRepository {
    async findByEmail(email) {
        const row = await UserModel.findOne({ where: { email } })
        return row ? new User(row.toJSON()) : null
    }

    async createUser(user) {
        const row = await UserModel.create(user)
        return new User(row.toJSON())
    }
}

module.exports = { SequelizeUserRepository }
