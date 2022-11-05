import { Router, Request, Response } from "express";
import { jwtMiddlewareCamman } from '../../middlewares/jwtMiddleware';
import { success } from "../../utils/response";
import { ICreatePhotoDto } from "../photos/photoDtos/createPhotoDto";
import logger from "../../config/logger";
import PhotoService from '../photos/photo.service';
import multer from 'multer'
import { get } from 'lodash'
import { errorHandler } from "../../utils/ErrorHandler";
import { ImulterFileType } from "../admin/admin.photo.contoller"
const CammanRouter = Router()
const upload = multer({
    dest: "uploads/",
})

CammanRouter.use(jwtMiddlewareCamman)
CammanRouter.get("/", async (req: Request, res: Response) => {
    logger.info("start:camman getAll photo")
    try {
        const ps = new PhotoService()
        await ps.superInitialize()
        const result = await ps.findValid()
        logger.info("finish:camman getAll photo")
        return success(res, result)
    } catch (err) {
        logger.error("error:camman getAll photo")
        return errorHandler(res, err)
    }
})
CammanRouter.get("/:id", async (req: Request, res: Response) => {
    logger.info("start:camman getOne passcode")
    try {
        const ps = new PhotoService()
        await ps.superInitialize()
        const result = await ps.findOne(req.params.id)
        logger.info("finish:camman getOne photo")
        return success(res, result)
    } catch (err) {
        logger.error("error:camman getOne photo")
        return errorHandler(res, err)
    }
})
CammanRouter.post("/", upload.array('photos', 12), async (req: Request, res: Response) => {
    logger.info("start:camman create photo")
    try {

        const ps = new PhotoService()
        await ps.superInitialize()
        //@ts-ignore
        console.log(req.files)
        const fileUploadPromise = (get(req, 'files', []) as ImulterFileType[]).filter(e => e.fieldname === "photos").map((e) => {
            return new Promise((resolve, reject) => {
                const fileDto = { photo: `/img/${e.filename}` } as ICreatePhotoDto
                ps.create(fileDto).then(result => {
                    logger.info(result)
                    resolve(null)
                }).catch(error => {
                    logger.error(error)
                    reject(error)
                })
            })

        })
        await Promise.all(fileUploadPromise)
        logger.info("finish:camman create photo")
        return success(res, null)
    } catch (err) {
        logger.error("error:camman create photo")
        return errorHandler(res, err)
    }
})
export default CammanRouter