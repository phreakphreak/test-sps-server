const { CreateUser } = require('./create-user.application')
const { userRepository } = require('../infrastructure')
const { UpdateUser } = require('./update-user.application')
const { DeleteUser } = require('./delete-user.application')
const { FindUserById } = require('./find-user.application')
const { FindAllUser } = require('./find-all-user.application')

const createUser = new CreateUser(userRepository)
const updateUser = new UpdateUser(userRepository)
const deleteUser = new DeleteUser(userRepository)
const findUserById = new FindUserById(userRepository)
const findAllUser = new FindAllUser(userRepository)

module.exports = {
    findAllUser,
    createUser,
    deleteUser,
    updateUser,
    findUserById,
}
