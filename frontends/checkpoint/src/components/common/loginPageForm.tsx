import Joi from "joi";
export interface ILoginDto {
    loginName: string;
    password: string;
}

export const VLoginDto = Joi.object({
    loginName: Joi.string().required(),
    password: Joi.string().required(),
});
