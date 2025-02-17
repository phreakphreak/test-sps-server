class UserNotFoundError extends Error {
    constructor() {
        super('User Not Found')
    }
}

class UserCredentialsError extends Error {
    constructor() {
        super('Credentials invalid')
    }
}

class UserNotImplemented extends Error {
    constructor() {
        super('User Not Implemented')
    }
}

module.exports = {
    UserCredentialsError,
    UserNotFoundError,
    UserNotImplemented,
}
