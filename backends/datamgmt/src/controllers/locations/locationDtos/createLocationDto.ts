import Joi from "joi"
export interface ILocation {
    lat: number
    long: number
}
export interface ICreateLocationDto {
    displayName?: string
    message?: string
    location: ILocation | null
    locationDescription?: string

}

export const VCreateLocationDto = Joi.object({
    displayName: Joi.string().optional().allow(""),
    message: Joi.string().optional().allow(""),
    location: Joi.alternatives().try(Joi.object({ lat: Joi.number(), long: Joi.number() }).required(), Joi.valid(null)),
    locationDescription: Joi.string().optional().allow(""),
})