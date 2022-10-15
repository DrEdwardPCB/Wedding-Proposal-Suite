import Joi from "joi"

export interface IUpdatePasscodeDto {
    passcode: string
}
export const VUpdatePasscodeDto = Joi.object({
    passcode: Joi.string()
})