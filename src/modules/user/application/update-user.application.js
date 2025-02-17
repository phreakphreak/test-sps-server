const { UserRepository } = require('../domain/user.repository')
const { UserUpdateValidator } = require('../domain/user.validator')

class UpdateUser {
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

    async execute(id, data) {
        UserUpdateValidator.parse(data)
        const existingUser = await this.userRepository.findById(id)
        if (!existingUser) {
            throw new Error('User not found')
        }
        if (data.email && data.email !== existingUser.email) {
            const userWithEmail = await this.userRepository.findByEmail(
                data.email
            )
            if (userWithEmail) {
                throw new Error('User with this email already exists')
            }
        }
        return await this.userRepository.update(id, data)
    }
}

module.exports = { UpdateUser }
