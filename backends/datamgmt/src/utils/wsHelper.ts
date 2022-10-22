import { isNil } from 'lodash';
import expressWs from 'express-ws';
import logger from '../config/logger'
export class WsHelper {
    //this class is for helping the getting the wsInstance
    private static instance: WsHelper
    public static getInstance(): WsHelper {
        if (isNil(WsHelper.instance)) {
            WsHelper.instance = new WsHelper()
        }
        return WsHelper.instance
    }
    private wsInstance: expressWs.Instance

    public setSocket(wsInstance: expressWs.Instance) {
        this.wsInstance = wsInstance
    }
    public getSocket(): expressWs.Instance {
        return this.wsInstance
    }

    public broadcast(message: string) {
        if (isNil(this.wsInstance)) {
            throw new Error("ws not yet initialie")
        }
        const socket = this.wsInstance.getWss()
        logger.info(socket.clients.size)
        socket.clients.forEach(client => {
            client.send(message)
        })
    }
}