import Joi from "joi"
export interface ICreatePasscodePartialDto {
    message: string
}
export const VCreatePasscodePartialDto = Joi.object({
    message: Joi.string()
})