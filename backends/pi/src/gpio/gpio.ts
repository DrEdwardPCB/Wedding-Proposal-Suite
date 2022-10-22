import { isNil } from 'lodash'
import {Gpio} from 'onoff'
import logger from "../config/logger"
//const motor= setOutput(32)//gpio 12 pin32
//const led = setOutput(33)//gpio 13 pin 33
// const motorRotateTime:number=5000
// const ledLightTime:number = 10000 
export class GpioController{
    private initialized=false
    private motor:Gpio
    private led:Gpio
    private motorRotateTime:number
    private ledLightTime:number 
    private static instance:GpioController
    
    private constructor(motorPin:number=16, ledPin:number=26, motorRotateTime:number=5000 ,ledLightTime:number = 10000  ){
        if(isNil(GpioController.instance)){
            logger.info("initializing GpioController")
            this.motor = new Gpio(motorPin,'out')
            this.led = new Gpio(ledPin,'out')
            this.motorRotateTime = motorRotateTime
            this.ledLightTime = ledLightTime
            this.initialized = true
        }
       
    }
    public static getInstance(){
        if(isNil(GpioController.instance)){
            GpioController.instance = new GpioController()
        }
        return GpioController.instance
    }
    public async openBox(){
        if(!this.initialized){
            throw new Error("not initialized")
        }
        logger.info("start open box")
        const motorPromise=new Promise((resolve, reject)=>{
            this.motor.writeSync(Gpio.HIGH)
            setTimeout(()=>{
                this.motor.writeSync(Gpio.LOW)
                resolve(null)
            },this.motorRotateTime)
        })
        const ledPromise=new Promise((resolve,reject)=>{
            this.led.writeSync(Gpio.HIGH)
            setTimeout(()=>{
                this.led.writeSync(Gpio.LOW)
                resolve(null)
            },this.ledLightTime)
        })
        await Promise.all([motorPromise,ledPromise])
        logger.info("end openBox")
    }
    public async close(){
        this.motor.unexport()
        this.led.unexport()
        this.initialized = false
    }
}