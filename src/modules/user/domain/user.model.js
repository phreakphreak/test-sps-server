class User {
    constructor({ id, name, email, type, password }) {
        this.id = id
        this.name = name
        this.email = email
        this.type = type
        this.password = password
    }

    equalsByEmail(email) {
        return this.email === email?.trim()
    }

    isAdmin() {
        return this.type === 'admin'
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            type: this.type,
            password: this.password,
        }
    }
}

module.exports = { User }
