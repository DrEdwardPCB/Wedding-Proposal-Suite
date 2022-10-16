import Joi from 'joi'
import { ICreateUserDto } from './createUserDto';
export interface IUpdateUserDto extends Omit<Omit<ICreateUserDto, "loginName">, "password"> {
    loginName?: string | null
    password?: string | null
}
export const VUpdateUserDto = Joi.object({
    loginName: Joi.string().optional().allow('').allow(null),
    password: Joi.string().min(8).optional().allow('').allow(null),
    isCameraMan: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
    isApp: Joi.boolean().required(),
})