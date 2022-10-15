import { Request, Response, Router } from "express";
import { IUpdatePasscodePartialDto, VUpdatePasscodePartialDto } from "./../passcodePartial/passcodePartialDtos/updatePasscodePartialDto";
import { VCreatePasscodePartialDto } from "./../passcodePartial/passcodePartialDtos/createPasscodePartialDto";

import { success } from "../../utils/response";
import { errorHandler } from "../../utils/ErrorHandler";
import logger from "../../config/logger";
import PasscodePartialService from "../passcodePartial/passcodePartial.service";
import { ICreatePasscodePartialDto } from '../passcodePartial/passcodePartialDtos/createPasscodePartialDto';

const AdminPasscodePartialRouter = Router()
AdminPasscodePartialRouter.get("/", async (req: Request, res: Response) => {
    logger.info("start:admin getAll passcodePartial")
    try {
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.findAll()
        logger.info("finish:admin getAll passcodePartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getAll passcodePartial")
        return errorHandler(res, err)
    }
})

AdminPasscodePartialRouter.get("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin getOne passcodePartial")
    try {
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.findOne(req.params.id)
        logger.info("finish:admin getOne passcodePartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getOne passcodePartial")
        return errorHandler(res, err)
    }
})

AdminPasscodePartialRouter.post("/", async (req: Request, res: Response) => {
    logger.info("start:admin create passcodePartial")
    try {
        const validatedReq: ICreatePasscodePartialDto = await VCreatePasscodePartialDto.validateAsync(req.body)
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.create(validatedReq)
        logger.info("finish:admin create passcodePartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin create passcodePartial")
        return errorHandler(res, err)
    }
})
AdminPasscodePartialRouter.put("/:desid/loc/:locid", async (req: Request, res: Response) => {
    logger.info("start:admin assoLoc")
    try {
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.assoLoc(req.params.desid, req.params.locid)
        logger.info("finish:admin assoLoc")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin assoLoc")
        return errorHandler(res, err)
    }
})
AdminPasscodePartialRouter.delete("/:desid/loc", async (req: Request, res: Response) => {
    logger.info("start:admin dissoLoc")
    try {
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.dissoLoc(req.params.desid)
        logger.info("finish:admin dissoLoc")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin dissoLoc")
        return errorHandler(res, err)
    }
})



AdminPasscodePartialRouter.put("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin update passcodePartial")
    try {
        const validatedReq: IUpdatePasscodePartialDto = await VUpdatePasscodePartialDto.validateAsync(req.body)
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.update(req.params.id, validatedReq)
        logger.info("finish:admin update passcodePartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin update passcodePartial")
        return errorHandler(res, err)
    }
})


AdminPasscodePartialRouter.delete("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin delete passcodePartial")
    try {
        const pps = new PasscodePartialService()
        await pps.superInitialize()
        const result = await pps.delete(req.params.id)
        logger.info("finish:admin delete passcodePartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin delete passcodePartial")
        return errorHandler(res, err)
    }
})



export default AdminPasscodePartialRouter