const { TokenRepository } = require('../domain/token.repository')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

class JwtTokenRepository extends TokenRepository {
    constructor(secretKey) {
        super()
        this.secretKey = secretKey
    }

    generateToken(payload) {
        const jsonSchema = z.record(z.any(), {
            message: 'payload is not valid',
        })
        jsonSchema.parse(payload)
        return jwt.sign(payload, this.secretKey, { expiresIn: '15m' })
    }

    verifyToken(token) {
        return jwt.verify(token, this.secretKey)
    }
}

module.exports = {
    JwtTokenRepository,
}
