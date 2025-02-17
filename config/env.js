module.exports = {
    DATABASE_STORAGE: process.env.DATABASE_STORAGE || 'database.sqlite',
    USE_MEMORY_DB: process.env.USE_MEMORY_DB === 'true',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
}
