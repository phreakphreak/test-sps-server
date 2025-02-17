const { UserRepository } = require('../../user/domain/user.repository')
const { TokenRepository } = require('../../token/domain/token.repository')
const { User } = require('../../user/domain/user.model')
const {
    UserNotFoundError,
    UserNotImplemented,
    UserCredentialsError,
} = require('../../shared/errors')

class AuthService {
    userRepository = new UserRepository()
    tokenRepository = new TokenRepository()

    constructor(userRepository, tokenRepository) {
        this.#validateUserRepository(userRepository)
        this.#validateTokenRepository(tokenRepository)
        this.userRepository = userRepository
        this.tokenRepository = tokenRepository
    }

    async authenticate(email, password) {
        const result = await this.userRepository.findByEmail(email)
        const user = this.#validateUser(result)
        if (user.password !== password) throw new UserCredentialsError()
        const userResponse = user.toJSON({ password: false })
        const token = this.tokenRepository.generateToken(userResponse)

        return {
            token,
            user: userResponse,
        }
    }

    #validateUserRepository(repository) {
        const isValid = repository instanceof UserRepository
        if (!isValid) {
            throw new ReferenceError('User repository does not exist')
        }
    }

    #validateUser(user) {
        const isValid = user instanceof User
        if (!user) throw new UserNotFoundError()
        if (!isValid) throw new UserNotImplemented()
        return user
    }

    #validateTokenRepository(repository) {
        const isValid = repository instanceof TokenRepository
        if (!isValid) {
            throw new ReferenceError('Token repository does not exist')
        }
    }

    async verifyToken(token) {
        const user = this.tokenRepository.verifyToken(token)
        const userFound = await this.userRepository.findById(user.id)
        this.#validateUser(userFound)
        if (!userFound.equalsByEmail(user.email)) {
            throw new UserNotFoundError()
        }
        return user
    }
}

module.exports = { AuthService }
