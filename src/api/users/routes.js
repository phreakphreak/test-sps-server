const { Router } = require('express')
const {
    validateContentType,
    validateJWT,
    validateIsAdmin,
} = require('../../middlewares')
const {
    createUser,
    deleteUser,
    updateUser,
    findUserById,
    findAllUser,
} = require('../../modules/user/application')
const { z } = require('zod')
const routes = Router()

routes.get('/users', validateJWT, validateIsAdmin, async (req, res) => {
    try {
        const users = await findAllUser.execute()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

routes.post(
    '/users',
    validateContentType,
    validateJWT,
    validateIsAdmin,
    async (req, res) => {
        try {
            const user = await createUser.execute(req.body)
            return res.status(201).json(user.toJSON({ password: false }))
        } catch (error) {
            if (error.message === 'User with this email already exists') {
                return res.status(409).json({ message: error.message })
            } else if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors,
                })
            }
            console.error('Error creating user:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
)

routes.get('/users/:id', validateJWT, async (req, res) => {
    try {
        const user = await findUserById.execute(req.params.id)
        if (
            req.user.type !== 'admin' &&
            Number(user.id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message:
                    'Forbidden: You do not have permission to access this resource.',
            })
        }
        return res.status(200).json(user.toJSON({ password: false }))
    } catch (error) {
        console.error('Error find user:', error)
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
})

routes.patch(
    '/users/:id',
    validateContentType,
    validateJWT,
    async (req, res) => {
        try {
            const user = await updateUser.execute(req.params.id, req.body)
            if (
                req.user.type !== 'admin' &&
                Number(user.id) !== Number(req.user.id)
            ) {
                return res.status(403).json({
                    message:
                        'Forbidden: You do not have permission to access this resource.',
                })
            }
            res.status(200).json({ message: 'User updated successfully' })
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ message: error.message })
            } else if (
                error.message === 'User with this email already exists'
            ) {
                res.status(409).json({ message: error.message })
            } else if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors,
                })
            } else {
                console.error('Error updating user:', error)
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }
)

routes.delete('/users/:id', validateJWT, validateIsAdmin, async (req, res) => {
    try {
        const user = await findUserById.execute(req.params.id)
        if (
            req.user.type !== 'admin' &&
            Number(user.id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message:
                    'Forbidden: You do not have permission to access this resource.',
            })
        }
        await deleteUser.execute(req.params.id)
        res.status(204).send()
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message })
        } else {
            console.error('Error deleting user:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
})

module.exports = routes
