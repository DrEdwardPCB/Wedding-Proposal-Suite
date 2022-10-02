import Joi from 'joi'
import { User } from '../../../database/entities/User'
export interface ILoginDto {
    loginName: string
    password: string
}

export const VLoginDto = Joi.object({
    loginName: Joi.string().required(),
    password: Joi.string().required()
})

export interface ILoginReturnDto {
    user: Partial<User>
    token: string
}