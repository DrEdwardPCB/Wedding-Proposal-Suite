import { Request, Response, Router } from "express";

import { success } from "../../utils/response";
import { errorHandler } from "../../utils/ErrorHandler";
import logger from "../../config/logger";
import PhotoService from '../photos/photo.service';
import multer from 'multer'
import { get } from "lodash";
import { env } from "../../config/env";
import { ICreatePhotoDto } from "../photos/photoDtos/createPhotoDto";
const upload = multer({
    dest: "uploads/",
})
const AdminPhotoContoller = Router()
AdminPhotoContoller.get("/", async (req: Request, res: Response) => {
    logger.info("start:admin getAll photo")
    try {
        const ps = new PhotoService()
        await ps.superInitialize()
        const result = await ps.findAll()
        logger.info("finish:admin getAll photo")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getAll photo")
        return errorHandler(res, err)
    }
})
AdminPhotoContoller.get("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin getOne passcode")
    try {
        const ps = new PhotoService()
        await ps.superInitialize()
        const result = await ps.findOne(req.params.id)
        logger.info("finish:admin getOne photo")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getOne photo")
        return errorHandler(res, err)
    }
})

export interface ImulterFileType {
    fieldname: string
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}


AdminPhotoContoller.post("/", upload.array('photos', 12), async (req: Request, res: Response) => {
    logger.info("start:admin create photo")
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
        logger.info("finish:admin create photo")
        return success(res, null)
    } catch (err) {
        logger.error("error:admin create photo")
        return errorHandler(res, err)
    }
})

AdminPhotoContoller.delete("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin delete photo")
    try {
        const pps = new PhotoService()
        await pps.superInitialize()
        const result = await pps.delete(req.params.id)
        logger.info("finish:admin delete photo")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin delete photo")
        return errorHandler(res, err)
    }
})






export default AdminPhotoContoller