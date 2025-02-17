const { z } = require('zod')

const UserCreateValidator = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    type: z.enum(['admin', 'user'], {
        message: 'Type must be either "admin" or "user"',
    }),
    password: z
        .string()
        .min(4, { message: 'Password must be at least 6 characters long' }),
})

const UserUpdateValidator = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
})

module.exports = {
    UserCreateValidator,
    UserUpdateValidator,
}
