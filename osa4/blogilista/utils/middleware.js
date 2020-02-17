const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path)
    logger.info(request.body)
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'enknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if( error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if(error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    } else {
        logger.info('errorHandler, else')
    }
    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
}