import { Router } from 'express'
import { internalServerError, success } from '../../utils/response'
import { WsHelper } from '../../utils/wsHelper'
import LocationService from '../locations/location.service';
import { jwtMiddlewareApp } from '../../middlewares/jwtMiddleware';
import { isNil } from 'lodash';
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
AppController.post('/scan/:id', async (req, res) => {
    try {
        const ls = new LocationService()
        await ls.initialize()
        await ls.update(req.params.id, { scanTime: new Date() })

    } catch (err) {
        return internalServerError(res, null)
    }
})
AppController.get('/reset', async (req, res) => {
    try {
        const ls = new LocationService()
        await ls.initialize()
        await ls.resetScantime()

    } catch (err) {
        return internalServerError(res, null)
    }
})

export default AppController
