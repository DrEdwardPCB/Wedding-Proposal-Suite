import logger from './config/logger'
import websocket from 'websocket'
import { env } from './config/env'
import express from 'express'
import { get } from 'lodash'
import { GpioController } from './gpio/gpio'
interface WebsocketMessage{
    type:"utf8",
    utf8Data:string,
}

const WebSocketClient = websocket.client
GpioController.getInstance()
const app=express()
const server = app.listen(env.PORT, async function(){
    const serverUrl = `${env.SERVER_FULL_ADDRESS}/ws/`.replace('http','ws')
    logger.info(`server starting at port ${env.PORT}`)
    logger.info(`${env.SERVER_FULL_ADDRESS}/ws`.replace('http','ws'))
    const client = new WebSocketClient()
    client.on("connectFailed", function(){
        logger.error("connection to server socket failed")
    })
    client.on('connect',function(connection){
        logger.info("socket open")
        connection.emit('ping')
        //@ts-ignore
        connection.on("message", async function(rawMessage:WebsocketMessage){
            logger.info(JSON.stringify(rawMessage))
            const message:string = get(rawMessage, "utf8Data", "")
            if(message==="passcode"){
                logger.info("passcode")
                await GpioController.getInstance().openBox()
            }
        })
        connection.on("close", ()=>{
            logger.info("connection closed")
        })
    })
    client.connect(serverUrl)


   
})
const gracefulShutdown = async(callType:any)=>{
    logger.info(`${callType} signal received`)
    GpioController.getInstance().close()
    server.close(function(err:any){
        if(err){
            logger.error(`server error`, err)
            process.exit(1);
        }else{
            process.exit(0)
        }
    })
}
process.on("SIGINT", async()=> gracefulShutdown("SIGINT"))