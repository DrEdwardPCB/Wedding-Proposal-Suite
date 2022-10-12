import { Router } from 'express'
import { success } from "./../../utils/response";
import { jwtMiddlewareAdmin } from "./../../middlewares/jwtMiddleware";
import logger from '../../config/logger'
import { errorHandler } from '../../utils/ErrorHandler'
import AuthService from './auth.service'
import { ILoginDto, VLoginDto } from './dtos/loginDto'

const authController = Router()

authController.post("/login", async function (req, res) {
    logger.info(`start login service`)
    try {
        const data = req.body
        const validatedData: ILoginDto = await VLoginDto.validateAsync(data)
        const as = new AuthService()
        const result = await as.login(validatedData)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }
})
authController.use(jwtMiddlewareAdmin)
authController.post("/renew", async function (req, res) {
    logger.info(`start renew service`)
    try {
        const as = new AuthService()
        const result = await as.renew(req)
        return success(res, result)

    } catch (err) {
        return errorHandler(res, err)
    }
})
export default authController