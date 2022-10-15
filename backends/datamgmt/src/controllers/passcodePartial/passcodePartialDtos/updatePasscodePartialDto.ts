import { ICreatePasscodePartialDto } from './createPasscodePartialDto'
import Joi from "joi"
export interface IUpdatePasscodePartialDto extends ICreatePasscodePartialDto { }
export const VUpdatePasscodePartialDto = Joi.object({
    message: Joi.string()
})