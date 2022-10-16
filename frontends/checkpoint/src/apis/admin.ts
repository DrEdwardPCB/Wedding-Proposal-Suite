import axios from "axios";
import { ILoginDto } from "../components/common/loginPageForm";
import { env } from "../env";
import Joi from 'joi'
const adminHttp = axios.create({ baseURL: `${env.REACT_APP_DATAMGMT_BASEURL}/admin` })

// user

export const getUsers = async (token: string) => {
    return adminHttp.get(`/user`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getUser = async (id: string, token: string) => {
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
    loginName: Joi.string().optional().allow('').allow(null),
    password: Joi.string().min(8).optional().allow('').allow(null),
    isCameraMan: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
    isApp: Joi.boolean().required(),
})
export const createUser = async (payload: ICreateUserDto, token: string) => {
    return adminHttp.post(`/user`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const updateUser = async (id: string, payload: IUpdateUserDto, token: string) => {
    return adminHttp.put(`/user/${id}`, payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteUser = async (id: string, token: string) => {
    return adminHttp.delete(`/user/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
//destination partial

//passcode

//password partial

//location

//photo