import { Request, Response, Router } from "express";
import { VUpdateUserDto } from "./../user/userDtos/updateUserDto";
import { IUpdateUserDto } from "./../user/userDtos/updateUserDto";
import { ICreateUserDto, VCreateUserDto } from "./../user/userDtos/createUserDto";
import { success } from "./../../utils/response";
import { errorHandler } from "../../utils/ErrorHandler";
import UserService from "../user/user.service";
import logger from "../../config/logger";

const AdminUserRouter = Router()
AdminUserRouter.get("/", async (req: Request, res: Response) => {
    logger.info("start:admin getAll user")
    try {
        const us = new UserService()
        await us.superInitialize()
        const result = await us.findAll()
        logger.info("finish:admin getAll user")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getAll user")
        return errorHandler(res, err)
    }
})

AdminUserRouter.get("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin getOne user")
    try {
        const us = new UserService()
        await us.superInitialize()
        const result = await us.findOne(req.params.id)
        logger.info("finish:admin getOne user")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin getOne user")
        return errorHandler(res, err)
    }
})

AdminUserRouter.post("/", async (req: Request, res: Response) => {
    logger.info("start:admin create user")
    try {
        const validatedReq: ICreateUserDto = await VCreateUserDto.validateAsync(req.body)
        const us = new UserService()
        await us.superInitialize()
        const result = await us.create(validatedReq)
        logger.info("finish:admin create user")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin create user")
        return errorHandler(res, err)
    }
})

AdminUserRouter.put("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin update user")
    try {
        const validatedReq: IUpdateUserDto = await VUpdateUserDto.validateAsync(req.body)
        const us = new UserService()
        await us.superInitialize()
        const result = await us.update(req.params.id, validatedReq)
        logger.info("finish:admin update user")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin update user")
        return errorHandler(res, err)
    }
})


AdminUserRouter.delete("/:id", async (req: Request, res: Response) => {
    logger.info("start:admin delete user")
    try {
        const us = new UserService()
        await us.superInitialize()
        const result = await us.delete(req.params.id)
        logger.info("finish:admin delete user")
        return success(res, result)
    } catch (err) {
        logger.error("error:admin delete user")
        return errorHandler(res, err)
    }
})



export default AdminUserRouter