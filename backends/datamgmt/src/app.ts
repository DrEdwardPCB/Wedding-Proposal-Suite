import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import { logger } from 'express-winston';
import { accessLoggerConfig } from './config/logger';
import authController from './controllers/auth/auth.controller';
import AdminRouter from './controllers/admin/admin.controller'
import CheckpointRouter from './controllers/checkPoint/checkpoint.controller';
export const bootstrap = () => {
    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(logger(accessLoggerConfig))
    app.use('/img', express.static("uploads"))
    app.use('/auth', authController)
    app.use('/admin', AdminRouter)
    app.use('/checkpoint', CheckpointRouter)
    return app
}