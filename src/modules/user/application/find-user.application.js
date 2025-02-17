const { UserRepository } = require('../domain/user.repository')

class FindUserById {
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
            throw new Error('User not found')
        }
        return existingUser
    }
}

module.exports = { FindUserById }
