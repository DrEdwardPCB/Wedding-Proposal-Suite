import { Request, Response, Router } from "express";
import { ICreateLocationDto, VCreateLocationDto } from "./../locations/locationDtos/createLocationDto";
import { IUpdateLocationDto } from "./../locations/locationDtos/updateLocationDto";

import { success } from "./../../utils/response";
import { errorHandler } from "../../utils/ErrorHandler";
import logger from "../../config/logger";
import LocationService from "../locations/location.service";
import { VUpdateLocationDto } from '../locations/locationDtos/updateLocationDto';

const AdminLocationRouter = Router()
AdminLocationRouter.get("/", async (req: Request, res: Response) => {
    logger.info("start:admin getAll location")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.findAll()
        logger.info("finish:admin getAll location")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getAll location")
        return errorHandler(res, err)
    }
})

AdminLocationRouter.get("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin getOne location")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.findOne(req.params.id)
        logger.info("finish:admin getOne location")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getOne location")
        return errorHandler(res, err)
    }
})

AdminLocationRouter.post("/", async (req: Request, res: Response) => {
    logger.info("start:admin create location")
    try {
        const validatedReq: ICreateLocationDto = await VCreateLocationDto.validateAsync(req.body)
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.create(validatedReq)
        logger.info("finish:admin create location")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin create location")
        return errorHandler(res, err)
    }
})
AdminLocationRouter.put("/:locid/next/:nextid", async (req: Request, res: Response) => {
    logger.info("start:admin assoNext")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.assoNextLoc(req.params.locid, req.params.nextid)
        logger.info("finish:admin assoNext")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin assoNext")
        return errorHandler(res, err)
    }
})
AdminLocationRouter.delete("/:locid/next", async (req: Request, res: Response) => {
    logger.info("start:admin dissoNext")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.dissoNextLoc(req.params.locid)
        logger.info("finish:admin dissoNext")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin dissoNext")
        return errorHandler(res, err)
    }
})

AdminLocationRouter.put("/:locid/user/:usrid", async (req: Request, res: Response) => {
    logger.info("start:admin assoUser")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.assoUser(req.params.locid, req.params.usrid)
        logger.info("finish:admin assoUser")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin assoUser")
        return errorHandler(res, err)
    }
})
AdminLocationRouter.delete("/:locid/user", async (req: Request, res: Response) => {
    logger.info("start:admin dissoUser")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.dissoUser(req.params.locid)
        logger.info("finish:admin dissoUser")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin dissoUser")
        return errorHandler(res, err)
    }
})



AdminLocationRouter.put("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin update location")
    try {
        const validatedReq: IUpdateLocationDto = await VUpdateLocationDto.validateAsync(req.body)
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.update(req.params.id, validatedReq)
        logger.info("finish:admin update location")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin update location")
        return errorHandler(res, err)
    }
})


AdminLocationRouter.delete("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin delete location")
    try {
        const ls = new LocationService()
        await ls.superInitialize()
        const result = await ls.delete(req.params.id)
        logger.info("finish:admin delete location")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin delete location")
        return errorHandler(res, err)
    }
})



export default AdminLocationRouter