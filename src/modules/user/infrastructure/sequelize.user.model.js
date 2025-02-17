const { DataTypes } = require('sequelize')
const { SequelizeClient } = require('../../shared/db/sequelize-client')

const sequelize = new SequelizeClient().getConnection()

const UserModel = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        type: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'users', timestamps: false }
)

module.exports = { UserModel }
