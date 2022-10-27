import { Router } from 'express'
import { internalServerError, success } from '../../utils/response'
import { WsHelper } from '../../utils/wsHelper'
const AppController = Router()

AppController.post('/passcode', (req, res) => {
    try {
        WsHelper.getInstance().broadcast("passcode")
        return success(res, "")
    } catch (err) {
        return internalServerError(res, null)
    }
})
AppController.get('/location/:id',(req,res)=>{
    try{
        return success(res,"https://github.com/DrEdwardPCB/Wedding-Proposal-Suite")
    }catch(err){
        return internalServerError(res,null)
    }
})

export default AppController
