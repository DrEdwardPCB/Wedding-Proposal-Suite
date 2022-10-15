import { Request, Response, Router } from "express";
import { VUpdatePasscodeDto } from "./../passcode/dtos/updatePasscodeDto";
import { VCreatePasscodeDto } from "./../passcode/dtos/createPasscodeDto";

import { success } from "../../utils/response";
import { errorHandler } from "../../utils/ErrorHandler";
import logger from "../../config/logger";
import PasscodeService from "../passcode/passcode.service";
import { ICreatePasscodeDto } from "../passcode/dtos/createPasscodeDto";
import { IUpdatePasscodeDto } from '../passcode/dtos/updatePasscodeDto';

const AdminPasscodeRouter = Router()
AdminPasscodeRouter.get("/", async (req: Request, res: Response) => {
    logger.info("start:admin getOne passcode")
    try {
        const ps = new PasscodeService()
        await ps.superInitialize()
        const result = await ps.findOne()
        logger.info("finish:admin getOne passcode")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getOne passcode")
        return errorHandler(res, err)
    }
})



AdminPasscodeRouter.post("/", async (req: Request, res: Response) => {
    logger.info("start:admin create passcode")
    try {
        const validatedReq: ICreatePasscodeDto = await VCreatePasscodeDto.validateAsync(req.body)
        const ps = new PasscodeService()
        await ps.superInitialize()
        const result = await ps.create(validatedReq)
        logger.info("finish:admin create passcode")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin create passcode")
        return errorHandler(res, err)
    }
})

AdminPasscodeRouter.put("/", async (req: Request, res: Response) => {
    logger.info("start:admin update passcode")
    try {
        const validatedReq: IUpdatePasscodeDto = await VUpdatePasscodeDto.validateAsync(req.body)
        const ps = new PasscodeService()
        await ps.superInitialize()
        const result = await ps.update(validatedReq)
        logger.info("finish:admin update passcode")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin update passcode")
        return errorHandler(res, err)
    }
})

AdminPasscodeRouter.delete("/", async (req: Request, res: Response) => {
    logger.info("start:admin delete passcode")
    try {
        const pps = new PasscodeService()
        await pps.superInitialize()
        const result = await pps.delete()
        logger.info("finish:admin delete passcode")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin delete passcode")
        return errorHandler(res, err)
    }
})






export default AdminPasscodeRouter