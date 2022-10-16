import Joi from "joi"
import { ILocation } from "./createLocationDto";
export interface IUpdateLocationDto {
    displayName?: string
    photoone?: string | null,
    phototwo?: string | null,
    photothree?: string | null,
    scanTime?: string | Date,
    message?: string
    location?: ILocation | null
    locationDescription?: string

}

export const VUpdateLocationDto = Joi.object({
    displayName: Joi.string().optional().allow(""),
    photoone: Joi.string().optional().allow(null),
    phototwo: Joi.string().optional().allow(null),
    photothree: Joi.string().optional().allow(null),
    scanTime: Joi.string().optional(),
    message: Joi.string().optional().allow(""),
    location: Joi.alternatives().try(Joi.object({ lat: Joi.number(), long: Joi.number() }).required(), Joi.valid(null)).optional(),
    locationDescription: Joi.string().optional().allow(""),
})