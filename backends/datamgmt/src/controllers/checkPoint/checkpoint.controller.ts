import { Request, Router, Response } from "express";
import { IUpdateLocationDto } from "./../locations/locationDtos/updateLocationDto";
import { NotFoundError } from "./../../utils/ErrorHandler";
import { errorHandler } from "./../../utils/ErrorHandler";
import { VUpdateLocationDto } from "./../locations/locationDtos/updateLocationDto";
import logger from "../../config/logger";
import { jwtMiddlewareUser } from "../../middlewares/jwtMiddleware";
import multer from 'multer'
import LocationService from "../locations/location.service";
import UserService from '../user/user.service';
import { success } from "../../utils/response";
import { isNil } from 'lodash';
import { ImulterFileType } from '../admin/admin.photo.contoller';
import { ValidationError } from '../../utils/ErrorHandler';
const CheckpointRouter = Router()
const upload = multer({
    dest: "uploads/",
})

CheckpointRouter.use(jwtMiddlewareUser)

CheckpointRouter.get("/", async function (req: Request, res: Response) {
    logger.info("start: checkpoint getting all info")
    try {
        const us = new UserService()
        await us.superInitialize()
        const user = await us.findOne(req.jwt?.id as string)
        logger.info("finish: checkpoint getting all info")
        return success(res, user)
    } catch (err) {
        return errorHandler(res, err)
    }
})
CheckpointRouter.put("/location", async function (req: Request, res: Response) {
    logger.info("start: checkpoint update location")
    try {
        const validatedReq: IUpdateLocationDto = await VUpdateLocationDto.validateAsync(req.body)
        const ls = new LocationService()
        await ls.superInitialize()
        logger.info("finish:checkpoint update location")
        const result = await ls.update(req.params.id, validatedReq)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }
})

CheckpointRouter.post('/location/upload1', upload.single('photo'), async function (req: Request, res: Response) {
    logger.info("start: checkpoint location uploading 1")
    try {
        const userid = req.jwt?.id
        if (isNil(userid)) {
            return new NotFoundError('userid not found')
        }
        const us = new UserService()
        await us.superInitialize()
        const ls = new LocationService()
        await ls.superInitialize()
        const user = await us.findOne(userid)
        if (isNil(user)) {
            return new NotFoundError('user not found')
        }
        const locationId = user.location?.id
        if (isNil(locationId)) {
            return new NotFoundError("user don't have location associated")
        }
        const file: ImulterFileType | undefined = req.file
        if (isNil(file)) {
            return new ValidationError("uploaded file not found")
        }
        const updateObj: IUpdateLocationDto = {
            photoone: `/img/${file.filename}`
        }
        const result = await ls.update(locationId, updateObj)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }

})
CheckpointRouter.delete('/location/upload1', async function (req: Request, res: Response) {
    logger.info("start: checkpoint location uploading 1")
    try {
        const userid = req.jwt?.id
        if (isNil(userid)) {
            return new NotFoundError('userid not found')
        }
        const us = new UserService()
        await us.superInitialize()
        const ls = new LocationService()
        await ls.superInitialize()
        const user = await us.findOne(userid)
        if (isNil(user)) {
            return new NotFoundError('user not found')
        }
        const locationId = user.location?.id
        if (isNil(locationId)) {
            return new NotFoundError("user don't have location associated")
        }
        const updateObj: IUpdateLocationDto = {
            photoone: null
        }
        const result = await ls.update(locationId, updateObj)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }
})

CheckpointRouter.post('/location/upload2', upload.single('photo'), async function (req: Request, res: Response) {
    logger.info("start: checkpoint location uploading 1")
    try {
        const userid = req.jwt?.id
        if (isNil(userid)) {
            return new NotFoundError('userid not found')
        }
        const us = new UserService()
        await us.superInitialize()
        const ls = new LocationService()
        await ls.superInitialize()
        const user = await us.findOne(userid)
        if (isNil(user)) {
            return new NotFoundError('user not found')
        }
        const locationId = user.location?.id
        if (isNil(locationId)) {
            return new NotFoundError("user don't have location associated")
        }
        const file: ImulterFileType | undefined = req.file
        if (isNil(file)) {
            return new ValidationError("uploaded file not found")
        }
        const updateObj: IUpdateLocationDto = {
            phototwo: `/img/${file.filename}`
        }
        const result = await ls.update(locationId, updateObj)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }

})
CheckpointRouter.delete('/location/upload2', async function (req: Request, res: Response) {
    logger.info("start: checkpoint location uploading 1")
    try {
        const userid = req.jwt?.id
        if (isNil(userid)) {
            return new NotFoundError('userid not found')
        }
        const us = new UserService()
        await us.superInitialize()
        const ls = new LocationService()
        await ls.superInitialize()
        const user = await us.findOne(userid)
        if (isNil(user)) {
            return new NotFoundError('user not found')
        }
        const locationId = user.location?.id
        if (isNil(locationId)) {
            return new NotFoundError("user don't have location associated")
        }
        const updateObj: IUpdateLocationDto = {
            phototwo: null
        }
        const result = await ls.update(locationId, updateObj)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }
})

CheckpointRouter.post('/location/upload3', upload.single('photo'), async function (req: Request, res: Response) {
    logger.info("start: checkpoint location uploading 1")
    try {
        const userid = req.jwt?.id
        if (isNil(userid)) {
            return new NotFoundError('userid not found')
        }
        const us = new UserService()
        await us.superInitialize()
        const ls = new LocationService()
        await ls.superInitialize()
        const user = await us.findOne(userid)
        if (isNil(user)) {
            return new NotFoundError('user not found')
        }
        const locationId = user.location?.id
        if (isNil(locationId)) {
            return new NotFoundError("user don't have location associated")
        }
        const file: ImulterFileType | undefined = req.file
        if (isNil(file)) {
            return new ValidationError("uploaded file not found")
        }
        const updateObj: IUpdateLocationDto = {
            photothree: `/img/${file.filename}`
        }
        const result = await ls.update(locationId, updateObj)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }

})
CheckpointRouter.delete('/location/upload3', async function (req: Request, res: Response) {
    logger.info("start: checkpoint location uploading 1")
    try {
        const userid = req.jwt?.id
        if (isNil(userid)) {
            return new NotFoundError('userid not found')
        }
        const us = new UserService()
        await us.superInitialize()
        const ls = new LocationService()
        await ls.superInitialize()
        const user = await us.findOne(userid)
        if (isNil(user)) {
            return new NotFoundError('user not found')
        }
        const locationId = user.location?.id
        if (isNil(locationId)) {
            return new NotFoundError("user don't have location associated")
        }
        const updateObj: IUpdateLocationDto = {
            photothree: null
        }
        const result = await ls.update(locationId, updateObj)
        return success(res, result)
    } catch (err) {
        return errorHandler(res, err)
    }
})
export default CheckpointRouter