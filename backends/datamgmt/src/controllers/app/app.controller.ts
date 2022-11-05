import { Router } from 'express'
import { internalServerError, success } from '../../utils/response'
import { WsHelper } from '../../utils/wsHelper'
import LocationService from '../locations/location.service';
import { jwtMiddlewareApp } from '../../middlewares/jwtMiddleware';
const AppController = Router()
AppController.use(jwtMiddlewareApp)
AppController.post('/passcode', (req, res) => {
    try {
        WsHelper.getInstance().broadcast("passcode")
        return success(res, "")
    } catch (err) {
        return internalServerError(res, null)
    }
})
AppController.get('/locations', async (req, res) => {
    try {
        const ls = new LocationService()
        await ls.initialize()
        const result = await ls.findAll()
        return success(res, result)
    } catch (err) {
        return internalServerError(res, null)
    }
})
AppController.post('/scan/:id', (req, res) => {
    try {
        return success(res, "https://github.com/DrEdwardPCB/Wedding-Proposal-Suite")
    } catch (err) {
        return internalServerError(res, null)
    }
})

export default AppController
