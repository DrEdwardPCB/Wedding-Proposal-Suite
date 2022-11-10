import { Router } from 'express'
import { badRequest, internalServerError, success } from '../../utils/response'
import { WsHelper } from '../../utils/wsHelper'
import LocationService from '../locations/location.service';
import { jwtMiddlewareApp } from '../../middlewares/jwtMiddleware';
import { isNil } from 'lodash';
import PasscodeService from '../passcode/passcode.service';
const AppController = Router()
AppController.use(jwtMiddlewareApp)
AppController.post('/passcode', async (req, res) => {
    try {
        const ps = new PasscodeService()
        await ps.initialize()
        const passcode = await ps.findOne()
        console.log(req.body.passcode)
        console.log(passcode)
        if (passcode?.passcode === req.body.passcode) {

            WsHelper.getInstance().broadcast("passcode")
            return success(res, 'password OK')
        }
        return success(res, "password incorrect")

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
        return success(res, null)

    } catch (err) {
        return internalServerError(res, null)
    }
})
AppController.get('/reset', async (req, res) => {
    try {
        const ls = new LocationService()
        await ls.initialize()
        await ls.resetScantime()
        return success(res, null)
    } catch (err) {
        return internalServerError(res, null)
    }
})

export default AppController
