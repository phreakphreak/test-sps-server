const { UserRepository } = require('../domain/user.repository')
const { UserModel } = require('./sequelize.user.model')
const { User } = require('../domain/user.model')

class SequelizeUserRepository extends UserRepository {
    async findByEmail(email) {
        const row = await UserModel.findOne({ where: { email } })
        return row ? new User(row.toJSON()) : null
    }

    async create(user) {
        const row = await UserModel.create(user)
        return new User(row.toJSON())
    }

    async findById(id) {
        const row = await UserModel.findByPk(id)
        return row ? new User(row.toJSON()) : null
    }

    async update(id, userData) {
        const [updated] = await UserModel.update(userData, { where: { id } })
        if (updated) {
            const row = await UserModel.findByPk(id)
            return new User(row.toJSON())
        }
        return null
    }

    async delete(id) {
        const deleted = await UserModel.destroy({ where: { id } })
        return deleted > 0
    }

    async findAll() {
        const rows = await UserModel.findAll()
        const users = rows.map((row) => new User(row.toJSON()))
        return users
    }
}

module.exports = { SequelizeUserRepository }
