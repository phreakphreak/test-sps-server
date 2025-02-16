const { userRepository } = require('../user/infrastructure')
const { tokenRepository } = require('../token/infrastructure')
const { AuthService } = require('./services/auth.service')

const authService = new AuthService(userRepository, tokenRepository)

module.exports = {
    authService,
}
