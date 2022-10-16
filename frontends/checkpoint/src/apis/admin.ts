import axios, { AxiosResponse } from "axios";
import { env } from "../env";
import Joi from 'joi'
import { User, Location, DestinationPartial, PasswordPartial, Passcode, Photo } from "../components/common/entityInterface";
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
export const getDestinationPartials = async (token: string): Promise<AxiosResponse<baseResponse<DestinationPartial[]>, any>> => {
    return adminHttp.get(`/destination`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getDestinationPartial = async (id: string, token: string): Promise<AxiosResponse<baseResponse<DestinationPartial>, any>> => {
    return adminHttp.get(`/destination/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export interface ICreateDestinationPartialDto {
    message: string
}
export const VCreateDestinationPartialDto = Joi.object({
    message: Joi.string()
})
export interface IUpdateDestinationPartialDto extends ICreateDestinationPartialDto { }
export const VUpdateDestinationPartialDto = Joi.object({
    message: Joi.string()
})
export const createDestinationPartial = async (payload: ICreateDestinationPartialDto, token: string): Promise<AxiosResponse<baseResponse<DestinationPartial>, any>> => {
    return adminHttp.post(`/destination`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const updateDestinationPartial = async (id: string, payload: IUpdateDestinationPartialDto, token: string): Promise<AxiosResponse<baseResponse<DestinationPartial>, any>> => {
    return adminHttp.put(`/destination/${id}`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteDestinationPartial = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/destination/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const assoDesLoc = async (id: string, locid: string, token: string): Promise<AxiosResponse<baseResponse<DestinationPartial>, any>> => {
    return adminHttp.put(`/destination/${id}/loc/${locid}`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}
export const dissoDesLoc = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/destination/${id}/loc`, { headers: { "Authorization": `Bearer ${token}` } })
}

//passcode
export const getPasscode = async (token: string): Promise<AxiosResponse<baseResponse<Passcode>, any>> => {
    return adminHttp.get(`/passcode`, { headers: { "Authorization": `Bearer ${token}` } })
}
export interface ICreatePasscodeDto {
    passcode: string
}
export const VCreatePasscodeDto = Joi.object({
    passcode: Joi.string()
})
export interface IUpdatePasscodeDto extends ICreatePasscodeDto { }
export const VUpdatePasscodeDto = Joi.object({
    passcode: Joi.string()
})
export const createPasscode = async (payload: ICreatePasscodeDto, token: string): Promise<AxiosResponse<baseResponse<Passcode>, any>> => {
    return adminHttp.post(`/passcode`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const updatePasscode = async (payload: IUpdatePasscodeDto, token: string): Promise<AxiosResponse<baseResponse<Passcode>, any>> => {
    return adminHttp.put(`/passcode`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deletePasscode = async (token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/passcode`, { headers: { "Authorization": `Bearer ${token}` } })
}

//password partial
export const getPasswordPartials = async (token: string): Promise<AxiosResponse<baseResponse<[]>, any>> => {
    return adminHttp.get(`/secret`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getPasswordPartial = async (id: string, token: string): Promise<AxiosResponse<baseResponse<PasswordPartial>, any>> => {
    return adminHttp.get(`/secret/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export interface ICreatePasswordPartialDto {
    message: string
}
export const VCreatePasswordPartialDto = Joi.object({
    message: Joi.string()
})
export interface IUpdatePasswordPartialDto extends ICreatePasswordPartialDto { }
export const VUpdatePasswordPartialDto = Joi.object({
    message: Joi.string()
})
export const createPasswordPartial = async (payload: ICreatePasswordPartialDto, token: string): Promise<AxiosResponse<baseResponse<PasswordPartial>, any>> => {
    return adminHttp.post(`/secret`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const updatePasswordPartial = async (id: string, payload: IUpdatePasswordPartialDto, token: string): Promise<AxiosResponse<baseResponse<PasswordPartial>, any>> => {
    return adminHttp.put(`/secret/${id}`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deletePasswordPartial = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/secret/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const assoPassLoc = async (id: string, locid: string, token: string): Promise<AxiosResponse<baseResponse<PasswordPartial>, any>> => {
    return adminHttp.put(`/secret/${id}/loc/${locid}`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}
export const dissoPassLoc = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/secret/${id}/loc`, { headers: { "Authorization": `Bearer ${token}` } })
}

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
    return adminHttp.put(`/location/${id}/next/${nextid}`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}
export const dissoNextLoc = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/location/${id}/next`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const assoUser = async (id: string, userid: string, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return adminHttp.put(`/location/${id}/user/${userid}`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}
export const dissoUser = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/location/${id}/user`, { headers: { "Authorization": `Bearer ${token}` } })
}


//photo
export const getPhotos = async (token: string): Promise<AxiosResponse<baseResponse<Photo[]>, any>> => {
    return adminHttp.get(`/photo`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getPhoto = async (id: string, token: string): Promise<AxiosResponse<baseResponse<Photo>, any>> => {
    return adminHttp.get(`/photo/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const createPhoto = async (payload: FormData, token: string): Promise<AxiosResponse<baseResponse<Photo>, any>> => {
    return adminHttp.post(`/photo`, payload, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': `multipart/form-data` } })
}
export const deletePhoto = async (id: string, token: string): Promise<AxiosResponse<baseResponse<any>, any>> => {
    return adminHttp.delete(`/photo/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}