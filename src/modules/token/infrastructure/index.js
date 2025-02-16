const { JwtTokenRepository } = require('./jwt-token.repository')
const { JWT_SECRET } = require('../../../../config/env')

const jwtTokenRepository = new JwtTokenRepository(JWT_SECRET)

module.exports = {
    tokenRepository: jwtTokenRepository,
}
