const { UserRepository } = require('../domain/user.repository')
const { UserCreateValidator } = require('../domain/user.validator')

class CreateUser {
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

    async execute(data) {
        UserCreateValidator.parse(data)
        const existingUser = await this.userRepository.findByEmail(data.email)
        if (existingUser) {
            throw new Error('User with this email already exists')
        }
        return await this.userRepository.create(data)
    }
}

module.exports = { CreateUser }
