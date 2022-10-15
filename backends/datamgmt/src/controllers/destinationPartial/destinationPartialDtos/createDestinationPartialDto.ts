import Joi from "joi"

export interface ICreateDestinationPartialDto {
    message: string
}
export const VCreateDestinationPartialDto = Joi.object({
    message: Joi.string()
})