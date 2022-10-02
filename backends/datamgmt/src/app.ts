import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import { logger } from 'express-winston';
import { accessLoggerConfig } from './config/logger';
export const bootstrap = () => {
    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(logger(accessLoggerConfig))
    app.use('/img', express.static("uploads"))
    return app
}