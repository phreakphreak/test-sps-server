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

    toJSON(options = {}) {
        const defaultFields = {
            id: true,
            name: true,
            email: true,
            type: true,
            password: true,
        }
        const fieldsToInclude = { ...defaultFields, ...options }
        const json = {}
        if (fieldsToInclude.id) json.id = this.id
        if (fieldsToInclude.name) json.name = this.name
        if (fieldsToInclude.email) json.email = this.email
        if (fieldsToInclude.type) json.type = this.type
        if (fieldsToInclude.password) json.password = this.password
        return json
    }
}

module.exports = { User }
