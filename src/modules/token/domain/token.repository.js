class TokenRepository {
    generateToken(payload) {
        throw new Error('Método no implementado')
    }

    verifyToken(token) {
        throw new Error('Método no implementado')
    }
}

module.exports = { TokenRepository }
