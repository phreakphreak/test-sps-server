const { UserRepository } = require('../domain/user.repository')

class FindAllUser {
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

    async execute() {
        const users = await this.userRepository.findAll()
        return users?.map((user) => user.toJSON({ password: false }))
    }
}

module.exports = { FindAllUser }
