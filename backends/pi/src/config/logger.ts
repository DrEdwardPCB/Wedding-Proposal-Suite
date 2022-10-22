import winston from 'winston'
import { LoggerOptions as ExpressLoggerOptions } from 'express-winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'pi' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
export const accessLoggerConfig: ExpressLoggerOptions = {
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({
            filename: 'logs/access.log',
            level: 'info' //This setting is what i need to change for access lines only
        })
    ],
    msg: "HTTP {{req.method}} {{req.url}}",
}
export default logger
