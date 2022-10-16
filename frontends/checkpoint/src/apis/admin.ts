import axios, { AxiosResponse } from "axios";
import { ILoginDto } from "../components/common/loginPageForm";
import { env } from "../env";
import Joi from 'joi'
import { User, Location } from "../components/common/entityInterface";
import { baseResponse } from "../components/common/commonInterface";
const adminHttp = axios.create({ baseURL: `${env.REACT_APP_DATAMGMT_BASEURL}/admin` })

// user

export const getUsers = async (token: string): Promise<AxiosResponse<baseResponse<Partial<User>[]>, any>> => {
    return adminHttp.get(`/user`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getUser = async (id: string, token: string): Promise<AxiosResponse<baseResponse<Partial<User>>, any>> => {
    return adminHttp.get(`/user/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export interface ICreateUserDto {
    loginName: string
    password: string
    isCameraMan: boolean
    isAdmin: boolean
    isApp: boolean
}
export const VCreateUserDto = Joi.object({
    loginName: Joi.string().required(),
    password: Joi.string().min(8).required(),
    isCameraMan: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
    isApp: Joi.boolean().required(),
})
export interface IUpdateUserDto extends Omit<Omit<ICreateUserDto, "loginName">, "password"> {
    loginName?: string | null
    password?: string | null
}
export const VUpdateUserDto = Joi.object({
    loginName: Joi.string().optional().allow(''),
    password: Joi.string().min(8).optional().allow(''),
    isCameraMan: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
    isApp: Joi.boolean().required(),
})
export const createUser = async (payload: ICreateUserDto, token: string): Promise<AxiosResponse<baseResponse<Partial<User>>, any>> => {
    return adminHttp.post(`/user`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const updateUser = async (id: string, payload: IUpdateUserDto, token: string): Promise<AxiosResponse<baseResponse<Partial<User>>, any>> => {
    return adminHttp.put(`/user/${id}`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteUser = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/user/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
//destination partial

//passcode

//password partial

//location
export const getLocations = async (token: string): Promise<AxiosResponse<baseResponse<Location[]>, any>> => {
    return adminHttp.get(`/location`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getLocation = async (id: string, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return adminHttp.get(`/location/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

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

export interface IUpdateLocationDto {
    displayName?: string
    photoone?: string,
    phototwo?: string,
    photothree?: string,
    scanTime?: string | Date,
    message?: string
    location?: ILocation | null
    locationDescription?: string

}

export const VUpdateLocationDto = Joi.object({
    displayName: Joi.string().optional().allow(""),
    photoone: Joi.string().optional(),
    phototwo: Joi.string().optional(),
    photothree: Joi.string().optional(),
    scanTime: Joi.string().optional(),
    message: Joi.string().optional().allow(""),
    location: Joi.alternatives().try(Joi.object({ lat: Joi.number(), long: Joi.number() }).required(), Joi.valid(null)).optional(),
    locationDescription: Joi.string().optional().allow(""),
})

export const createLocation = async (payload: ICreateLocationDto, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return adminHttp.post(`/location`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const updateLocation = async (id: string, payload: IUpdateLocationDto, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return adminHttp.put(`/location/${id}`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteLocation = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/location/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const assoNextLoc = async (id: string, nextid: string, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return adminHttp.put(`/location/${id}/loc/${nextid}`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}
export const dissoNextLoc = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/location/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const assoUser = async (id: string, userid: string, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return adminHttp.put(`/location/${id}/user/${userid}`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}
export const dissoUser = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/location/${id}/user`, { headers: { "Authorization": `Bearer ${token}` } })
}


//photo