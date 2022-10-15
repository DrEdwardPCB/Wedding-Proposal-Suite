import { Response } from "express"

export const success = (res: Response, data: any, message: string = "success", code: number = 200, datetime: Date = new Date()) => {
    res.status(code)
    return res.json({
        code,
        message,
        data,
        timestamp: datetime
    })
}

export const badRequest = (res: Response, data: any, message: string = "Bad Request", code: number = 400, datetime: Date = new Date()) => {
    res.status(code)
    return res.json({
        code,
        message,
        data,
        timestamp: datetime
    })
}
export const unauthorized = (res: Response, data: any, message: string = "Unauthorized", code: number = 401, datetime: Date = new Date()) => {
    res.status(code)
    return res.json({
        code,
        message,
        data,
        timestamp: datetime
    })
}
export const internalServerError = (res: Response, data: any, message: string = "internal Server Error", code: number = 500, datetime: Date = new Date()) => {
    res.status(code)
    return res.json({
        code,
        message,
        data,
        timestamp: datetime
    })
}