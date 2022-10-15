import { Request, Response, Router } from "express";
import { ICreateDestinationPartialDto, VCreateDestinationPartialDto } from "./../destinationPartial/destinationPartialDtos/createDestinationPartialDto";

import { success } from "./../../utils/response";
import { errorHandler } from "../../utils/ErrorHandler";
import logger from "../../config/logger";
import DestinationPartialService from "../destinationPartial/detination.service";
import { IUpdateDestinationPartialDto, VUpdateDestinationPartialDto } from '../destinationPartial/destinationPartialDtos/updaateDestinationPartialDto';

const AdminDestinationPartialRouter = Router()
AdminDestinationPartialRouter.get("/", async (req: Request, res: Response) => {
    logger.info("start:admin getAll destinationPartial")
    try {
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.findAll()
        logger.info("finish:admin getAll destinationPartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getAll destinationPartial")
        return errorHandler(res, err)
    }
})

AdminDestinationPartialRouter.get("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin getOne destinationPartial")
    try {
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.findOne(req.params.id)
        logger.info("finish:admin getOne destinationPartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getOne destinationPartial")
        return errorHandler(res, err)
    }
})

AdminDestinationPartialRouter.post("/", async (req: Request, res: Response) => {
    logger.info("start:admin create destinationPartial")
    try {
        const validatedReq: ICreateDestinationPartialDto = await VCreateDestinationPartialDto.validateAsync(req.body)
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.create(validatedReq)
        logger.info("finish:admin create destinationPartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin create destinationPartial")
        return errorHandler(res, err)
    }
})
AdminDestinationPartialRouter.put("/:desid/loc/:locid", async (req: Request, res: Response) => {
    logger.info("start:admin assoLoc")
    try {
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.assoLoc(req.params.desid, req.params.locid)
        logger.info("finish:admin assoLoc")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin assoLoc")
        return errorHandler(res, err)
    }
})
AdminDestinationPartialRouter.delete("/:desid/loc", async (req: Request, res: Response) => {
    logger.info("start:admin dissoLoc")
    try {
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.dissoLoc(req.params.desid)
        logger.info("finish:admin dissoLoc")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin dissoLoc")
        return errorHandler(res, err)
    }
})



AdminDestinationPartialRouter.put("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin update destinationPartial")
    try {
        const validatedReq: IUpdateDestinationPartialDto = await VUpdateDestinationPartialDto.validateAsync(req.body)
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.update(req.params.id, validatedReq)
        logger.info("finish:admin update destinationPartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin update destinationPartial")
        return errorHandler(res, err)
    }
})


AdminDestinationPartialRouter.delete("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin delete destinationPartial")
    try {
        const dps = new DestinationPartialService()
        await dps.superInitialize()
        const result = await dps.delete(req.params.id)
        logger.info("finish:admin delete destinationPartial")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin delete destinationPartial")
        return errorHandler(res, err)
    }
})



export default AdminDestinationPartialRouter