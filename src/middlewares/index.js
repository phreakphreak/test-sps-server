const validateContentType = (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res
            .status(400)
            .json({ message: 'Content-Type debe ser application/json' })
    }
    next()
}

module.exports = {
    validateContentType,
}
