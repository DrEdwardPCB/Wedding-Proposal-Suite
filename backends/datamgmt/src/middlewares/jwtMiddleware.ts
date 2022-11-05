import { NextFunction, Request, Response } from "express";
import { unauthorized, internalServerError } from "./../utils/response";
import jwt from 'jsonwebtoken';
import { isNil } from 'lodash';
import { env } from '../config/env'
import { User } from "../database/entities/User";
import logger from "../config/logger";

export function jwtMiddlewareAdmin(req: Request, res: Response, next: NextFunction) {
    const BearerToken = req.headers.authorization
    const token = BearerToken?.replace("Bearer ", "")
    if (isNil(token)) {
        return unauthorized(res, {}, "jwt could not be found")
    } else {
        try {
            const verifiedObject: Partial<User> = jwt.verify(token, Buffer.from(env.JWT_SECRET)) as Partial<User>
            if (verifiedObject.isAdmin) {
                req.jwt = verifiedObject
                return next()
            } else {
                return unauthorized(res, {}, "jwt is invalid")
            }
        } catch (err) {
            logger.error(err)
            return internalServerError(res, err)
        }

    }
}
export function jwtMiddlewareCamman(req: Request, res: Response, next: NextFunction) {
    const BearerToken = req.headers.authorization
    const token = BearerToken?.replace("Bearer ", "")
    if (isNil(token)) {
        return unauthorized(res, {}, "jwt could not be found")
    } else {
        try {
            const verifiedObject: Partial<User> = jwt.verify(token, Buffer.from(env.JWT_SECRET)) as Partial<User>
            if (verifiedObject.isCameraMan) {
                req.jwt = verifiedObject
                return next()
            } else {
                return unauthorized(res, {}, "jwt is invalid")
            }
        } catch (err) {
            logger.error(err)
            return internalServerError(res, err)
        }

    }
}
export function jwtMiddlewareUser(req: Request, res: Response, next: NextFunction) {
    const BearerToken = req.headers.authorization
    const token = BearerToken?.replace("Bearer ", "")
    if (isNil(token)) {
        return unauthorized(res, {}, "jwt could not be found")
    } else {
        try {
            const verifiedObject: Partial<User> = jwt.verify(token, Buffer.from(env.JWT_SECRET)) as Partial<User>
            if (verifiedObject) {
                req.jwt = verifiedObject
                return next()
            } else {
                return unauthorized(res, {}, "jwt is invalid")
            }
        } catch (err) {
            logger.error(err)
            return internalServerError(res, err)
        }

    }
}
export function jwtMiddlewareApp(req: Request, res: Response, next: NextFunction) {
    const BearerToken = req.headers.authorization
    const token = BearerToken?.replace("Bearer ", "")
    if (isNil(token)) {
        return unauthorized(res, {}, "jwt could not be found")
    } else {
        try {
            console.log(jwt.decode(token))
            const verifiedObject: Partial<User> = jwt.verify(token, Buffer.from(env.JWT_SECRET).toString('base64')) as Partial<User>
            if (verifiedObject.isApp) {
                req.jwt = verifiedObject
                return next()
            } else {
                return unauthorized(res, {}, "jwt is invalid")
            }
        } catch (err) {
            logger.error(err)
            return internalServerError(res, err)
        }

    }
}
