const { UserRepository } = require('../../user/domain/user.repository')
const { TokenRepository } = require('../../token/domain/token.repository')
const { User } = require('../../user/domain/user.model')

class AuthService {
    userRepository = new UserRepository()
    tokenRepository = new TokenRepository()

    constructor(userRepository, tokenRepository) {
        this.validateUserRepository(userRepository)
        this.validateTokenRepository(tokenRepository)
        this.userRepository = userRepository
        this.tokenRepository = tokenRepository
    }

    async authenticate(email, password) {
        const result = await this.userRepository.findByEmail(email)
        const user = this.validateUser(result)
        if (user.password !== password) {
            throw new Error('Credentials invalid')
        }
        const userResponse = {
            id: user.id,
            email: user.email,
            type: user.type,
        }
        const token = this.tokenRepository.generateToken(userResponse)

        return {
            token,
            user: userResponse,
        }
    }

    validateUserRepository(repository) {
        const isValid = repository instanceof UserRepository
        if (!isValid) {
            throw new ReferenceError('User repository does not exist')
        }
    }

    validateUser(user) {
        const isValid = user instanceof User
        if (!user) throw new Error('User not found')
        if (!isValid) throw new Error('User exception')
        return user
    }

    validateTokenRepository(repository) {
        const isValid = repository instanceof TokenRepository
        if (!isValid) {
            throw new ReferenceError('Token repository does not exist')
        }
    }
}

module.exports = { AuthService }
