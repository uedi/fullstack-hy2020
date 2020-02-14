const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path)
    logger.info(request.body)
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'enknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if( error.name = 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else {
        logger.info('errorHandler, else')
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}