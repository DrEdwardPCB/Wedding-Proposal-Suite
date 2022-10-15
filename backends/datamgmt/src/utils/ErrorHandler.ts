import { unauthorized, badRequest, internalServerError } from './response';
import { Response } from 'express'
import { ValidationError as JoiValidationError } from 'joi';
import logger from '../config/logger';

export const errorHandler = (res: Response, err: unknown) => {
    logger.error(err)
    if (err instanceof ValidationError || err instanceof JoiValidationError) {
        return badRequest(res, err)
    } else if (err instanceof UnauthorizedError) {
        return unauthorized(res, err)
    } else if (err instanceof UnauthorizedError) {
        return unauthorized(res, err)
    } else {
        return internalServerError(res, err)
    }
}
export class ValidationError extends Error {
    constructor(message: string) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "UnauthorizedError";
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "NotFoundError"
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}