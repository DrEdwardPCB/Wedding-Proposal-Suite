import Joi from "joi"

export interface ICreatePasscodeDto {
    passcode: string
}
export const VCreatePasscodeDto = Joi.object({
    passcode: Joi.string()
})