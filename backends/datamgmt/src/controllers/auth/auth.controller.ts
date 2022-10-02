import { Router } from 'express'
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

    } catch (err) {
        return errorHandler(res, err)
    }
})
export default authController