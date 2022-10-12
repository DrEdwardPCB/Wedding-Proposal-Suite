import Joi from 'joi'
export interface ICreateUserDto {
    loginName: string
    password: string
    isCameraMan: boolean
    isAdmin: boolean
    isApp: boolean
}
export const VCreateUserDto = Joi.object({
    loginName: Joi.string().required(),
    password: Joi.string().min(8).required(),
    isCameraMan: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
    isApp: Joi.boolean().required(),
})