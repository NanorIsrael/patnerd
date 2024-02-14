import logger from './logging/logger'

export function main(name?: string) {
    const message = `hello ${name ? name : 'world'}`
    logger.log('debug', message)
    return { body: message, statusCode: 200 }
}
