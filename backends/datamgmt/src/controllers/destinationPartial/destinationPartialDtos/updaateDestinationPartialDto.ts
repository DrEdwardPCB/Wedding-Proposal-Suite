import { ICreateDestinationPartialDto } from './createDestinationPartialDto'
import Joi from "joi"
export interface IUpdateDestinationPartialDto extends ICreateDestinationPartialDto { }
export const VUpdateDestinationPartialDto = Joi.object({
    message: Joi.string()
})