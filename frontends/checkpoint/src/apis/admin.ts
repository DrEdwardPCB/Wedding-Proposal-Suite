import axios, { AxiosResponse } from "axios";
import { ILoginDto } from "../components/common/loginPageForm";
import { env } from "../env";
import Joi from 'joi'
import { User } from "../components/common/entityInterface";
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

//photo