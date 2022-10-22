import bodyParser from 'body-parser';
import AppController from "./controllers/app/app.controller"
import express from 'express';
import cors from 'cors'
import { logger } from 'express-winston';
import { accessLoggerConfig } from './config/logger';
import authController from './controllers/auth/auth.controller';
import AdminRouter from './controllers/admin/admin.controller'
import CheckpointRouter from './controllers/checkPoint/checkpoint.controller';
import expressWs from 'express-ws'
import { WsHelper } from './utils/wsHelper';
export const bootstrap = () => {
    const wsInstance = expressWs(express())
    const app = wsInstance.app
    WsHelper.getInstance().setSocket(wsInstance)
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(logger(accessLoggerConfig))
    app.use('/img', express.static("uploads"))
    app.use('/auth', authController)
    app.use('/admin', AdminRouter)
    app.use('/checkpoint', CheckpointRouter)
    app.use('/app', AppController)
    app.ws('/ws', (ws, req) => {
        ws.on("message", function (msg: string) {
            console.log(msg)
            if (msg === "ping") {
                ws.send("pong")
            }
            ws.send("pong")
        })
    })
    return app
}