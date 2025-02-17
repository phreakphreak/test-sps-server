const { UserRepository } = require('../domain/user.repository')
const { UserNotFoundError } = require('../../shared/errors')

class DeleteUser {
    userRepository = new UserRepository()

    constructor(userRepository) {
        this.#validateUserRepository(userRepository)
        this.userRepository = userRepository
    }

    #validateUserRepository(repository) {
        const isValid = repository instanceof UserRepository
        if (!isValid) {
            throw new ReferenceError('User repository does not exist')
        }
    }

    async execute(id) {
        const existingUser = await this.userRepository.findById(id)
        if (!existingUser) {
            throw new UserNotFoundError()
        }
        return await this.userRepository.delete(id)
    }
}

module.exports = { DeleteUser }
