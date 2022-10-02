import { unauthorized, badRequest, internalServerError } from './response';
import { Response } from 'express'
import { ValidationError as JoiValidationError } from 'joi';

export const errorHandler = (res: Response, err: unknown) => {
    if (err instanceof ValidationError || err instanceof JoiValidationError) {
        return badRequest(res, err)
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
    }
}
export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "UnauthorizedError";
    }
}