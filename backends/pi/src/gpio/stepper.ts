// import {Gpio} from 'onoff'
// export default class StepperController {
//     private stepPins = [24,25,8,7]
//     private pinNumber = this.stepPins.length
//     private pins:Gpio[] = []
//     private stepCounter = 0
//     private timeout = 0.01
//     private stepCount=8
//     private Seq:number[][]=[];
//     private keepMoving:boolean=false
//     constructor(){
//         this.Seq[0]=[1,0,0,0]
//         this.Seq[1]=[1,1,0,0]
//         this.Seq[2]=[0,1,0,0]
//         this.Seq[3]=[0,1,1,0]
//         this.Seq[4]=[0,0,1,0]
//         this.Seq[5]=[0,0,1,1]
//         this.Seq[6]=[0,0,0,1]
//         this.Seq[7]=[1,0,0,1]
//         for(var i = 0;i<this.pinNumber;i++){
//             this.pins[i] = new Gpio(this.stepPins[i],'out')
//         }
//     }
//     private step(){
//         for(var pin=0;pin<4;pin++){
//             if(this.Seq[this.stepCounter][pin]!=0){
//                 this.pins[pin].writeSync(1)
//             }else{
//                 this.pins[pin].writeSync(0)
//             }
//         }
//         this.stepCounter +=1
//         if(this.stepCounter===this.stepCount){
//             this.stepCounter=0
//         }
//         if(this.stepCounter<0){
//             this.stepCounter=this.stepCount
//         }
//         if(this.keepMoving){
//             let self = this
//             setTimeout(function(){self.step()},this.timeout)
//         }
        
//     }
//     public start(){
//         this.keepMoving=true
//         this.step()
//     }
//     public stop(){
//         this.keepMoving=false
//     }
   
// }